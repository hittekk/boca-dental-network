import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Eye, EyeOff, Trash2, Edit3, ExternalLink, Newspaper } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ORANGE = '#F3672A';
const DARK_NAVY = '#001D3D';

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  status: 'draft' | 'published';
  updated_at: string;
  published_at: string | null;
};

export default function BlogListPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin', 'blog_posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, status, updated_at, published_at')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as BlogRow[];
    },
  });

  // The on/off switch — stored in site_settings under key 'blog'.
  const { data: blogEnabled } = useQuery({
    queryKey: ['admin', 'blog_setting'],
    queryFn: async () => {
      const { data } = await supabase.from('site_settings').select('value').eq('key', 'blog').maybeSingle();
      return !!(data?.value as { enabled?: boolean } | undefined)?.enabled;
    },
  });

  const toggleEnabled = useMutation({
    mutationFn: async (next: boolean) => {
      const { error } = await supabase.from('site_settings').upsert({ key: 'blog', value: { enabled: next } });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'blog_setting'] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'blog_posts'] }),
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>Blog</h1>
          <p className="text-sm text-slate-500 mt-1">Write posts here. Use the switch to show or hide the blog on the live site.</p>
        </div>
        <button
          onClick={() => navigate('/dental-admin/blog/new')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98] shadow-lg"
          style={{ background: ORANGE, boxShadow: `0 8px 20px -8px ${ORANGE}` }}
        >
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      {/* On/off switch */}
      <div className="mb-6 flex items-center justify-between bg-white rounded-xl border border-slate-200 px-5 py-4">
        <div>
          <div className="font-semibold text-sm" style={{ color: DARK_NAVY }}>Blog section on the website</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {blogEnabled ? 'The blog is LIVE — a "Blog" link shows in the site menu.' : 'The blog is hidden — visitors can\'t see it or reach /blog.'}
          </div>
        </div>
        <button
          onClick={() => toggleEnabled.mutate(!blogEnabled)}
          disabled={toggleEnabled.isPending}
          aria-label="Toggle blog visibility"
          className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors disabled:opacity-50"
          style={{ background: blogEnabled ? '#15803D' : '#cbd5e1' }}
        >
          <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform" style={{ transform: blogEnabled ? 'translateX(22px)' : 'translateX(4px)' }} />
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : (posts ?? []).length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <div className="h-16 w-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${ORANGE}15` }}>
            <Newspaper className="h-7 w-7" style={{ color: ORANGE }} />
          </div>
          <h3 className="font-bold text-lg mb-1" style={{ color: DARK_NAVY }}>No posts yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">Write your first post, then flip the switch above when you're ready to show the blog.</p>
          <button onClick={() => navigate('/dental-admin/blog/new')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white" style={{ background: ORANGE }}>
            <Plus className="h-4 w-4" /> Write your first post
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Post</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(posts ?? []).map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link to={`/dental-admin/blog/${post.id}`} className="block">
                      <div className="font-semibold text-sm" style={{ color: DARK_NAVY }}>{post.title}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">/blog/{post.slug}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                      style={post.status === 'published' ? { background: '#DCFCE7', color: '#15803D' } : { background: '#FEF3C7', color: '#B45309' }}>
                      {post.status === 'published' ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{new Date(post.updated_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/dental-admin/blog/${post.id}`} title="Edit" className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100">
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      {post.status === 'published' && blogEnabled && (
                        <a href={`/blog/${post.slug}/`} target="_blank" rel="noreferrer" title="View live" className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <button onClick={() => { if (confirm(`Delete "${post.title}"? This can't be undone.`)) remove.mutate(post.id); }} disabled={remove.isPending} title="Delete" className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

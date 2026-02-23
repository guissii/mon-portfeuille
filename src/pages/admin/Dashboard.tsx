import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProjects } from '@/hooks/useProjects';
import { useCertifications } from '@/hooks/useCertifications';
import { useHackathons } from '@/hooks/useHackathons';
import { useCategories } from '@/hooks/useCategories';
import { useSettings } from '@/hooks/useSettings';
import { api } from '@/lib/api';
import {
  LayoutDashboard, FolderGit2, Award, Trophy, Plus, LogOut, Eye, Edit2,
  ChevronRight, Settings, Trash2, X, Save, Upload, Tag, ArrowLeft,
  Check, ExternalLink, Image, FileText, RotateCcw
} from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import { ImageCropperModal } from '@/components/admin/ImageCropperModal';

export function AdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { projects, refetch: refetchProjects, deleteProject } = useProjects();
  const { certifications, refetch: refetchCertifications, deleteCertification } = useCertifications();
  const { hackathons, refetch: refetchHackathons, deleteHackathon } = useHackathons();
  const { categories, createCategory, updateCategory, deleteCategory, refetch: refetchCategories } = useCategories();
  const { settings, updateSettings } = useSettings();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [cropperConfig, setCropperConfig] = useState<{
    image: string;
    field: string;
    type: string;
    aspectRatio: number;
    circular: boolean;
    index?: number;
  } | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const path = location.pathname.replace('/admin', '').replace('/', '');
    if (path) setActiveTab(path || 'dashboard');
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-black">
        <div className="w-8 h-8 border-2 border-cyber-mauve border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const navItems = [
    { label: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
    { label: 'Projets', id: 'projects', icon: FolderGit2 },
    { label: 'Certifications', id: 'certifications', icon: Award },
    { label: 'Hackathons', id: 'hackathons', icon: Trophy },
    { label: 'Categories', id: 'categories', icon: Tag },
    { label: 'Parametres', id: 'settings', icon: Settings },
  ];

  const stats = [
    { label: 'Projets', value: projects.length, icon: FolderGit2, color: 'text-cyber-mauve' },
    { label: 'Certifications', value: certifications.length, icon: Award, color: 'text-cyber-yellow' },
    { label: 'Hackathons', value: hackathons.length, icon: Trophy, color: 'text-green-400' },
    { label: 'Categories', value: categories.length, icon: Tag, color: 'text-blue-400' },
  ];

  // ---- CRUD Handlers ----

  const handleSaveProject = async () => {
    setSaving(true);
    try {
      if (editingItem) {
        await api.updateProject(editingItem.id, formData);
        showMessage('success', 'Projet mis a jour');
      } else {
        await api.createProject(formData);
        showMessage('success', 'Projet cree');
      }
      await refetchProjects();
      setEditingItem(null);
      setIsCreating(false);
      setFormData({});
    } catch (err: any) {
      showMessage('error', err.message);
    }
    setSaving(false);
  };

  const handleSaveCertification = async () => {
    setSaving(true);
    try {
      if (editingItem) {
        await api.updateCertification(editingItem.id, formData);
        showMessage('success', 'Certification mise a jour');
      } else {
        await api.createCertification(formData);
        showMessage('success', 'Certification creee');
      }
      await refetchCertifications();
      setEditingItem(null);
      setIsCreating(false);
      setFormData({});
    } catch (err: any) {
      showMessage('error', err.message);
    }
    setSaving(false);
  };

  const handleSaveHackathon = async () => {
    setSaving(true);
    try {
      if (editingItem) {
        await api.updateHackathon(editingItem.id, formData);
        showMessage('success', 'Hackathon mis a jour');
      } else {
        await api.createHackathon(formData);
        showMessage('success', 'Hackathon cree');
      }
      await refetchHackathons();
      setEditingItem(null);
      setIsCreating(false);
      setFormData({});
    } catch (err: any) {
      showMessage('error', err.message);
    }
    setSaving(false);
  };

  const handleSaveCategory = async () => {
    setSaving(true);
    try {
      if (editingItem) {
        await updateCategory(editingItem.id, formData);
        showMessage('success', 'Categorie mise a jour');
      } else {
        await createCategory(formData);
        showMessage('success', 'Categorie creee');
      }
      setEditingItem(null);
      setIsCreating(false);
      setFormData({});
    } catch (err: any) {
      showMessage('error', err.message);
    }
    setSaving(false);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await updateSettings(formData);
      showMessage('success', 'Parametres mis a jour');
    } catch (err: any) {
      showMessage('error', err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (type: string, id: string, name: string) => {
    if (!confirm(`Supprimer "${name}" ?`)) return;
    try {
      if (type === 'project') { await deleteProject(id); showMessage('success', 'Projet supprime'); }
      if (type === 'certification') { await deleteCertification(id); showMessage('success', 'Certification supprimee'); }
      if (type === 'hackathon') { await deleteHackathon(id); showMessage('success', 'Hackathon supprime'); }
      if (type === 'category') { await deleteCategory(id); showMessage('success', 'Categorie supprimee'); }
    } catch (err: any) {
      showMessage('error', err.message);
    }
  };

  const startEdit = (item: any) => {
    setEditingItem(item);
    setIsCreating(false);
    setFormData({ ...item });
  };

  const startCreate = (defaults: any = {}) => {
    setEditingItem(null);
    setIsCreating(true);
    setFormData(defaults);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setIsCreating(false);
    setFormData({});
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, type: string = 'general') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use cropper for all images
    const reader = new FileReader();
    reader.onload = () => {
      let aspectRatio = 16 / 9;
      let circular = false;

      if (field === 'profile_photo') {
        aspectRatio = 1;
        circular = true;
      } else if (field === 'image_url' || field === 'badge_url') {
        aspectRatio = 1;
      }

      setCropperConfig({
        image: reader.result as string,
        field,
        type,
        aspectRatio,
        circular
      });
    };
    reader.readAsDataURL(file);

    // Reset input so the same file can be selected again
    e.target.value = '';
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    if (!cropperConfig) return;

    setSaving(true);
    const { field, type, index } = cropperConfig;
    setCropperConfig(null);

    try {
      // Create a File object from the blob
      const file = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
      const result = await api.uploadFile(file, type);

      if (index !== undefined) {
        // Gallery/Items case
        const items = [...(formData[field] || [])];
        items[index] = result.url;
        updateField(field, items);
      } else {
        // Simple field case
        updateField(field, result.url);
      }

      showMessage('success', 'Image ajustée et téléchargée');
    } catch (err: any) {
      showMessage('error', `Erreur: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ---- Render Helpers ----

  const renderInput = (label: string, field: string, type = 'text', required = false) => (
    <div>
      <label className="block text-sm text-cyber-text-muted mb-1">{label}{required && ' *'}</label>
      <input
        type={type}
        value={formData[field] || ''}
        onChange={(e) => updateField(field, e.target.value)}
        className="cyber-input text-sm"
        required={required}
      />
    </div>
  );

  const renderTextarea = (label: string, field: string, rows = 3) => (
    <div>
      <label className="block text-sm text-cyber-text-muted mb-1">{label}</label>
      <textarea
        value={formData[field] || ''}
        onChange={(e) => updateField(field, e.target.value)}
        className="cyber-input text-sm resize-none"
        rows={rows}
      />
    </div>
  );

  const renderSelect = (label: string, field: string, options: { value: string; label: string }[]) => (
    <div>
      <label className="block text-sm text-cyber-text-muted mb-1">{label}</label>
      <select
        value={formData[field] || ''}
        onChange={(e) => updateField(field, e.target.value)}
        className="cyber-input text-sm"
      >
        <option value="">Selectionner...</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

  const renderCheckbox = (label: string, field: string) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={formData[field] || false}
        onChange={(e) => updateField(field, e.target.checked)}
        className="w-4 h-4 rounded border-white/20 bg-cyber-surface text-cyber-mauve focus:ring-cyber-mauve"
      />
      <span className="text-sm text-cyber-text">{label}</span>
    </label>
  );

  // ---- Gallery / Image List Manager ----
  const renderGalleryManager = (field: string, label: string) => {
    const items: string[] = formData[field] || [];
    return (
      <div>
        <label className="block text-sm text-cyber-text-muted mb-2">{label}</label>
        <div className="space-y-2">
          {items.map((url: string, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              {getImageUrl(url) && (
                <img src={getImageUrl(url)!} alt={`img-${idx}`} className="w-10 h-10 rounded object-cover border border-white/10 flex-shrink-0" />
              )}
              <div className="flex-1 flex flex-col gap-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = e.target.value;
                    updateField(field, newItems);
                  }}
                  className="cyber-input text-sm flex-1"
                  placeholder="URL de l'image"
                />
                <label className="text-[10px] text-cyber-mauve hover:text-cyber-mauve-light cursor-pointer inline-flex items-center gap-1 w-fit">
                  <Upload className="w-2.5 h-2.5" />
                  Ou upload fichier
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const reader = new FileReader();
                      reader.onload = () => {
                        setCropperConfig({
                          image: reader.result as string,
                          field,
                          type: 'gallery',
                          aspectRatio: 16 / 9,
                          circular: false,
                          index: idx
                        });
                      };
                      reader.readAsDataURL(file);
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>
              <button
                onClick={() => updateField(field, items.filter((_: string, i: number) => i !== idx))}
                className="p-2 rounded-lg text-cyber-text-muted hover:text-red-400 hover:bg-red-500/10 flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => updateField(field, [...items, ''])}
          className="mt-2 text-sm text-cyber-mauve hover:text-cyber-mauve-light inline-flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Ajouter une image
        </button>
      </div>
    );
  };

  // ---- Tab Content ----

  const renderDashboard = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-cyber-text">Dashboard</h1>
          <p className="text-cyber-text-muted mt-1">Bienvenue dans l'administration du portfolio</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-secondary hidden sm:inline-flex items-center gap-2">
          <Eye className="w-4 h-4" /> Voir le site
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <button key={s.label} onClick={() => setActiveTab(s.label.toLowerCase())} className="cyber-card p-6 text-left group hover:border-cyber-mauve/30">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-cyber-text-muted text-sm">{s.label}</p>
                <p className={cn('text-3xl font-bold mt-1', s.color)}>{s.value}</p>
              </div>
              <s.icon className={cn('w-6 h-6', s.color)} />
            </div>
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-cyber-text mb-4">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => { setActiveTab('projects'); startCreate({ status: 'draft', slug: '' }); }} className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nouveau projet
          </button>
          <button onClick={() => { setActiveTab('certifications'); startCreate({ status: 'draft', slug: '' }); }} className="btn-secondary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nouvelle certification
          </button>
          <button onClick={() => { setActiveTab('hackathons'); startCreate({ status: 'draft', slug: '' }); }} className="btn-secondary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nouveau hackathon
          </button>
        </div>
      </div>
    </div>
  );

  const renderProjectForm = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-cyber-text">
          {editingItem ? 'Modifier le projet' : 'Nouveau projet'}
        </h2>
        <button onClick={cancelEdit} className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5"><X className="w-5 h-5" /></button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {renderInput('Titre', 'title', 'text', true)}
        {renderInput('Slug', 'slug', 'text', true)}
        {renderInput('Tagline', 'tagline')}
        {renderInput('Role', 'role')}
        {renderInput('Duree', 'duration')}
        {renderInput('Taille equipe', 'team_size', 'number')}
        {renderInput('URL GitHub', 'github_url', 'url')}
        {renderInput('URL Live', 'live_url', 'url')}
        <div className="space-y-1">
          {renderInput('Image de couverture (URL)', 'cover_image', 'url')}
          <label className="btn-secondary text-[10px] py-1 px-2 cursor-pointer inline-flex items-center gap-1 w-fit">
            <Upload className="w-2.5 h-2.5" />
            Upload fichier
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'cover_image', 'projects')}
            />
          </label>
        </div>
        {renderSelect('Categorie', 'category_id', categories.map(c => ({ value: c.id, label: c.name })))}
        {renderSelect('Statut', 'status', [{ value: 'draft', label: 'Brouillon' }, { value: 'published', label: 'Publie' }])}
      </div>
      {renderCheckbox('Mis en avant (featured)', 'featured')}
      {renderTextarea('Description', 'description', 4)}
      {renderTextarea('Probleme', 'problem')}
      {renderTextarea('Solution', 'solution')}
      {renderTextarea('Impact', 'impact')}

      {/* PDF */}
      <div className="cyber-card p-4">
        <h3 className="text-sm font-medium text-cyber-text mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyber-mauve" /> Document PDF (optionnel)
        </h3>
        {renderInput('URL du PDF', 'pdf_url', 'url')}
      </div>

      {/* Gallery Manager */}
      <div className="cyber-card p-4">
        <h3 className="text-sm font-medium text-cyber-text mb-3 flex items-center gap-2">
          <Image className="w-4 h-4 text-cyber-mauve" /> Screenshots / Galerie
        </h3>
        {renderGalleryManager('gallery', 'Images du projet')}
      </div>

      <button onClick={handleSaveProject} disabled={saving} className="btn-primary inline-flex items-center gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </div>
  );

  const renderProjectsList = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-cyber-text">Projets ({projects.length})</h2>
        <button onClick={() => startCreate({ status: 'draft', slug: '' })} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nouveau
        </button>
      </div>
      <div className="space-y-3">
        {projects.map(p => (
          <div key={p.id} className="cyber-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-cyber-surface border border-white/5 flex-shrink-0 relative group">
                {getImageUrl(p.cover_image) ? (
                  <>
                    <img src={getImageUrl(p.cover_image)!} alt={p.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setCropperConfig({
                        image: getImageUrl(p.cover_image)!,
                        field: 'cover_image',
                        type: 'projects',
                        aspectRatio: 16 / 9,
                        circular: false
                      })}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Ajuster"
                    >
                      <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                  </>
                ) : (
                  <FolderGit2 className="w-6 h-6 text-cyber-mauve m-3" />
                )}
              </div>
              <div>
                <p className="text-cyber-text font-medium">{p.title}</p>
                <p className="text-cyber-text-muted text-sm">{p.tagline || 'Pas de tagline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('px-2 py-0.5 rounded-full text-xs', p.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400')}>
                {p.status === 'published' ? 'Publie' : 'Brouillon'}
              </span>
              <button onClick={() => startEdit(p)} className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-mauve hover:bg-cyber-mauve/10"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete('project', p.id, p.title)} className="p-2 rounded-lg text-cyber-text-muted hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <div className="cyber-card p-8 text-center text-cyber-text-muted">Aucun projet. Creez-en un !</div>}
      </div>
    </div>
  );

  const renderCertificationForm = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-cyber-text">{editingItem ? 'Modifier la certification' : 'Nouvelle certification'}</h2>
        <button onClick={cancelEdit} className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5"><X className="w-5 h-5" /></button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {renderInput('Nom', 'name', 'text', true)}
        {renderInput('Slug', 'slug', 'text', true)}
        {renderInput('Emetteur', 'issuer', 'text', true)}
        {renderInput('Date d\'obtention', 'issue_date', 'date', true)}
        {renderInput('Date d\'expiration', 'expiry_date', 'date')}
        {renderInput('ID Credential', 'credential_id')}
        {renderInput('URL Verification', 'verify_url', 'url')}
        <div className="space-y-1">
          {renderInput('URL Image (URL)', 'image_url', 'url')}
          <label className="btn-secondary text-[10px] py-1 px-2 cursor-pointer inline-flex items-center gap-1 w-fit">
            <Upload className="w-2.5 h-2.5" />
            Upload fichier
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'image_url', 'certifications')}
            />
          </label>
        </div>
        <div className="space-y-1">
          {renderInput('URL Badge (URL)', 'badge_url', 'url')}
          <label className="btn-secondary text-[10px] py-1 px-2 cursor-pointer inline-flex items-center gap-1 w-fit">
            <Upload className="w-2.5 h-2.5" />
            Upload fichier
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'badge_url', 'certifications')}
            />
          </label>
        </div>
        {renderSelect('Niveau', 'level', [
          { value: 'beginner', label: 'Debutant' }, { value: 'intermediate', label: 'Intermediaire' },
          { value: 'advanced', label: 'Avance' }, { value: 'expert', label: 'Expert' }
        ])}
        {renderSelect('Statut', 'status', [{ value: 'draft', label: 'Brouillon' }, { value: 'published', label: 'Publie' }])}
      </div>
      {renderCheckbox('Mise en avant (featured)', 'featured')}
      {renderTextarea('Description complete', 'description', 5)}
      <button onClick={handleSaveCertification} disabled={saving} className="btn-primary inline-flex items-center gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </div>
  );

  const renderCertificationsList = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-cyber-text">Certifications ({certifications.length})</h2>
        <button onClick={() => startCreate({ status: 'draft', slug: '', level: 'intermediate' })} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nouvelle
        </button>
      </div>
      <div className="space-y-3">
        {certifications.map(c => (
          <div key={c.id} className="cyber-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 relative group" style={{ background: 'rgba(157, 107, 247, 0.1)' }}>
                {getImageUrl(c.image_url) ? (
                  <>
                    <img src={getImageUrl(c.image_url)!} alt={c.name} className="w-full h-full object-contain rounded" />
                    <button
                      onClick={() => setCropperConfig({
                        image: getImageUrl(c.image_url)!,
                        field: 'image_url',
                        type: 'certifications',
                        aspectRatio: 1,
                        circular: false
                      })}
                      className="absolute inset-0 bg-black/60 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Ajuster"
                    >
                      <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                  </>
                ) : (
                  <Award className="w-6 h-6 text-cyber-mauve" />
                )}
              </div>
              <div>
                <p className="text-cyber-text font-medium">{c.name}</p>
                <p className="text-cyber-text-muted text-sm">{c.issuer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('px-2 py-0.5 rounded-full text-xs', c.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400')}>
                {c.status === 'published' ? 'Publie' : 'Brouillon'}
              </span>
              <button onClick={() => startEdit(c)} className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-mauve hover:bg-cyber-mauve/10"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete('certification', c.id, c.name)} className="p-2 rounded-lg text-cyber-text-muted hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {certifications.length === 0 && <div className="cyber-card p-8 text-center text-cyber-text-muted">Aucune certification.</div>}
      </div>
    </div>
  );

  const renderHackathonForm = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-cyber-text">{editingItem ? 'Modifier le hackathon' : 'Nouveau hackathon'}</h2>
        <button onClick={cancelEdit} className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5"><X className="w-5 h-5" /></button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {renderInput('Nom', 'name', 'text', true)}
        {renderInput('Slug', 'slug', 'text', true)}
        {renderInput('Organisateur', 'organizer')}
        {renderInput('Date', 'event_date', 'date')}
        {renderInput('Duree', 'duration')}
        {renderInput('Nom du projet', 'project_name')}
        {renderInput('Role', 'role')}
        {renderInput('Taille equipe', 'team_size', 'number')}
        {renderInput('URL Demo', 'demo_url', 'url')}
        {renderInput('URL Repo', 'repo_url', 'url')}
        {renderInput('URL Certificat', 'certificate_url', 'url')}
        {renderSelect('Resultat', 'result', [
          { value: 'winner', label: 'Gagnant' }, { value: 'finalist', label: 'Finaliste' },
          { value: 'top3', label: 'Top 3' }, { value: 'top5', label: 'Top 5' }, { value: 'participant', label: 'Participant' }
        ])}
        {renderSelect('Statut', 'status', [{ value: 'draft', label: 'Brouillon' }, { value: 'published', label: 'Publie' }])}
      </div>
      {renderCheckbox('Mis en avant (featured)', 'featured')}
      {renderTextarea('Description du projet', 'project_description', 3)}
      {renderTextarea('Probleme', 'problem')}
      {renderTextarea('Solution', 'solution')}
      {renderTextarea('Implementation', 'implementation')}

      {/* Tech Stack (comma separated) */}
      <div>
        <label className="block text-sm text-cyber-text-muted mb-1">Technologies (séparées par des virgules)</label>
        <input
          type="text"
          value={(formData.tech_stack || []).join(', ')}
          onChange={(e) => updateField('tech_stack', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
          className="cyber-input text-sm"
          placeholder="React, Node.js, Python..."
        />
      </div>

      {/* Screenshots Gallery */}
      <div className="cyber-card p-4">
        <h3 className="text-sm font-medium text-cyber-text mb-3 flex items-center gap-2">
          <Image className="w-4 h-4 text-cyber-mauve" /> Screenshots
        </h3>
        {renderGalleryManager('images', 'Images du hackathon')}
      </div>

      <button onClick={handleSaveHackathon} disabled={saving} className="btn-primary inline-flex items-center gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </div>
  );

  const renderHackathonsList = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-cyber-text">Hackathons ({hackathons.length})</h2>
        <button onClick={() => startCreate({ status: 'draft', slug: '' })} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nouveau
        </button>
      </div>
      <div className="space-y-3">
        {hackathons.map(h => (
          <div key={h.id} className="cyber-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 relative group" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                {h.images && h.images.length > 0 && getImageUrl(h.images[0]) ? (
                  <>
                    <img src={getImageUrl(h.images[0])!} alt={h.name} className="w-full h-full object-cover rounded" />
                    <button
                      onClick={() => setCropperConfig({
                        image: getImageUrl(h.images[0])!,
                        field: 'images',
                        type: 'hackathons',
                        aspectRatio: 16 / 9,
                        circular: false,
                        index: 0
                      })}
                      className="absolute inset-0 bg-black/60 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Ajuster"
                    >
                      <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                  </>
                ) : (
                  <Trophy className="w-6 h-6 text-green-400" />
                )}
              </div>
              <div>
                <p className="text-cyber-text font-medium">{h.name}</p>
                <p className="text-cyber-text-muted text-sm">{h.organizer} - {h.result}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('px-2 py-0.5 rounded-full text-xs', h.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400')}>
                {h.status === 'published' ? 'Publie' : 'Brouillon'}
              </span>
              <button onClick={() => startEdit(h)} className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-mauve hover:bg-cyber-mauve/10"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete('hackathon', h.id, h.name)} className="p-2 rounded-lg text-cyber-text-muted hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {hackathons.length === 0 && <div className="cyber-card p-8 text-center text-cyber-text-muted">Aucun hackathon.</div>}
      </div>
    </div>
  );

  const renderCategoryForm = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-cyber-text">{editingItem ? 'Modifier la categorie' : 'Nouvelle categorie'}</h2>
        <button onClick={cancelEdit} className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-text hover:bg-white/5"><X className="w-5 h-5" /></button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {renderInput('Nom', 'name', 'text', true)}
        {renderInput('Slug', 'slug', 'text', true)}
        {renderInput('Icone (nom Lucide)', 'icon')}
        {renderInput('Couleur (hex)', 'color')}
        {renderInput('Ordre', 'sort_order', 'number')}
      </div>
      {renderTextarea('Description', 'description')}
      <button onClick={handleSaveCategory} disabled={saving} className="btn-primary inline-flex items-center gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </div>
  );

  const renderCategoriesList = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-cyber-text">Categories ({categories.length})</h2>
        <button onClick={() => startCreate({ slug: '', sort_order: categories.length })} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nouvelle
        </button>
      </div>
      <div className="space-y-3">
        {categories.map(c => (
          <div key={c.id} className="cyber-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: c.color ? `${c.color}20` : 'rgba(157, 107, 247, 0.1)' }}>
                <Tag className="w-5 h-5" style={{ color: c.color || '#9d6bf7' }} />
              </div>
              <div>
                <p className="text-cyber-text font-medium">{c.name}</p>
                <p className="text-cyber-text-muted text-sm">{c.description || c.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => startEdit(c)} className="p-2 rounded-lg text-cyber-text-muted hover:text-cyber-mauve hover:bg-cyber-mauve/10"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete('category', c.id, c.name)} className="p-2 rounded-lg text-cyber-text-muted hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {categories.length === 0 && <div className="cyber-card p-8 text-center text-cyber-text-muted">Aucune categorie.</div>}
      </div>
    </div>
  );

  const renderSettings = () => {
    // Initialize form with settings if empty
    if (Object.keys(formData).length === 0 && Object.keys(settings).length > 0) {
      setFormData({ ...settings });
    }

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-cyber-text">Parametres du site</h2>

        <div className="cyber-card p-6">
          <h3 className="text-lg font-medium text-cyber-text mb-4">Profil</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {renderInput('Nom', 'profile_name')}
            {renderInput('Titre', 'profile_title')}
            <div>
              <label className="block text-sm text-cyber-text-muted mb-1">Photo de profil</label>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={formData.profile_photo || ''}
                  onChange={(e) => updateField('profile_photo', e.target.value)}
                  className="cyber-input text-sm"
                  placeholder="URL de la photo ou upload ->"
                />
                <div className="flex items-center gap-3">
                  <label className="btn-secondary text-xs cursor-pointer inline-flex items-center gap-2">
                    <Upload className="w-3 h-3" />
                    Upload Image (JPG/PNG)
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'profile_photo', 'profile')}
                    />
                  </label>
                  {getImageUrl(formData.profile_photo) && (
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <img src={getImageUrl(formData.profile_photo)!} alt="Preview" className="w-12 h-12 rounded-full object-cover border-2 border-cyber-mauve/30" />
                        <button
                          onClick={() => setCropperConfig({
                            image: getImageUrl(formData.profile_photo)!,
                            field: 'profile_photo',
                            type: 'profile',
                            aspectRatio: 1,
                            circular: true
                          })}
                          className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Ajuster"
                        >
                          <RotateCcw className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      <span className="text-xs text-cyber-text-muted">Aperçu</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {renderInput('Annees experience', 'years_experience')}
            {renderInput('Nombre de projets', 'projects_count')}
            {renderInput('Nombre de certifications', 'certifications_count')}
          </div>
          {renderTextarea('Description', 'profile_description', 3)}
        </div>

        <div className="cyber-card p-6">
          <h3 className="text-lg font-medium text-cyber-text mb-4">Liens sociaux</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {renderInput('GitHub', 'github_url', 'url')}
            {renderInput('LinkedIn', 'linkedin_url', 'url')}
            {renderInput('Twitter', 'twitter_url', 'url')}
            {renderInput('Email', 'email', 'email')}
          </div>
        </div>

        <button onClick={handleSaveSettings} disabled={saving} className="btn-primary inline-flex items-center gap-2">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Enregistrement...' : 'Enregistrer les parametres'}
        </button>
      </div>
    );
  };

  const renderContent = () => {
    if (editingItem || isCreating) {
      if (activeTab === 'projects') return renderProjectForm();
      if (activeTab === 'certifications') return renderCertificationForm();
      if (activeTab === 'hackathons') return renderHackathonForm();
      if (activeTab === 'categories') return renderCategoryForm();
    }

    switch (activeTab) {
      case 'projects': return renderProjectsList();
      case 'certifications': return renderCertificationsList();
      case 'hackathons': return renderHackathonsList();
      case 'categories': return renderCategoriesList();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-cyber-surface border-r border-white/5 flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link to="/admin" className="flex items-center gap-3" onClick={() => { setActiveTab('dashboard'); cancelEdit(); }}>
            <div className="w-10 h-10 rounded-lg bg-cyber-card border border-cyber-mauve/30 flex items-center justify-center">
              <span className="text-cyber-mauve font-bold text-lg font-mono">M</span>
            </div>
            <div>
              <span className="text-cyber-text font-semibold text-sm">Admin</span>
              <span className="block text-cyber-text-muted text-xs">Portfolio</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); cancelEdit(); }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left',
                activeTab === item.id
                  ? 'bg-cyber-mauve/10 text-cyber-mauve'
                  : 'text-cyber-text-muted hover:text-cyber-text hover:bg-white/5'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-cyber-mauve/10 flex items-center justify-center">
              <span className="text-cyber-mauve font-medium">{user?.email?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-cyber-text text-sm font-medium truncate">{user?.email}</p>
              <p className="text-cyber-text-muted text-xs">Administrateur</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-cyber-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" /> Deconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="lg:hidden bg-cyber-surface border-b border-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-cyber-text font-semibold">Admin</span>
            <button onClick={handleLogout} className="p-2 rounded-lg text-cyber-text-muted hover:text-red-400"><LogOut className="w-5 h-5" /></button>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {navItems.map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); cancelEdit(); }} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap', activeTab === item.id ? 'bg-cyber-mauve/10 text-cyber-mauve' : 'text-cyber-text-muted')}>
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* Toast Message */}
        {message && (
          <div className={cn('fixed top-4 right-4 z-50 p-4 rounded-lg flex items-center gap-3 shadow-lg animate-in', message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400')}>
            {message.type === 'success' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        <div className="p-6 lg:p-8">
          {renderContent()}
        </div>

        {cropperConfig && (
          <ImageCropperModal
            image={cropperConfig.image}
            aspectRatio={cropperConfig.aspectRatio}
            circular={cropperConfig.circular}
            onCropComplete={handleCropComplete}
            onCancel={() => setCropperConfig(null)}
          />
        )}
      </main>
    </div>
  );
}

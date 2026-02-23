import { supabase } from './supabase';

class ApiClient {
    // Auth
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    }

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }

    async getMe() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { user };
    }

    // Categories
    async getCategories() {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) throw error;
        return data;
    }

    async createCategory(data: any) {
        const { data: result, error } = await supabase
            .from('categories')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async updateCategory(id: string, data: any) {
        const { data: result, error } = await supabase
            .from('categories')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async deleteCategory(id: string) {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    // Projects
    async getProjects(params?: { status?: string; featured?: boolean; category?: string; limit?: number }) {
        let query = supabase.from('projects').select('*, categories(*)');

        if (params?.status) query = query.eq('status', params.status);
        if (params?.featured) query = query.eq('featured', true);
        if (params?.category) query = query.eq('category_id', params.category);
        if (params?.limit) query = query.limit(params.limit);

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }

    async getProjectBySlug(slug: string) {
        const { data, error } = await supabase
            .from('projects')
            .select('*, categories(*), project_screenshots(*)')
            .eq('slug', slug)
            .single();
        if (error) throw error;
        return data;
    }

    async createProject(data: any) {
        const { gallery, ...projectData } = data;
        const { data: result, error } = await supabase
            .from('projects')
            .insert(projectData)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async updateProject(id: string, data: any) {
        const { project_screenshots, categories, ...projectData } = data;
        const { data: result, error } = await supabase
            .from('projects')
            .update(projectData)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async deleteProject(id: string) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    // Certifications
    async getCertifications(params?: { status?: string; featured?: boolean; limit?: number }) {
        let query = supabase.from('certifications').select('*');

        if (params?.status) query = query.eq('status', params.status);
        if (params?.featured) query = query.eq('featured', true);
        if (params?.limit) query = query.limit(params.limit);

        const { data, error } = await query.order('issue_date', { ascending: false });
        if (error) throw error;
        return data;
    }

    async createCertification(data: any) {
        const { data: result, error } = await supabase
            .from('certifications')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async updateCertification(id: string, data: any) {
        const { data: result, error } = await supabase
            .from('certifications')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async deleteCertification(id: string) {
        const { error } = await supabase
            .from('certifications')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    // Hackathons
    async getHackathons(params?: { status?: string; featured?: boolean; limit?: number }) {
        let query = supabase.from('hackathons').select('*');

        if (params?.status) query = query.eq('status', params.status);
        if (params?.featured) query = query.eq('featured', true);
        if (params?.limit) query = query.limit(params.limit);

        const { data, error } = await query.order('event_date', { ascending: false });
        if (error) throw error;
        return data;
    }

    async createHackathon(data: any) {
        const { data: result, error } = await supabase
            .from('hackathons')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async updateHackathon(id: string, data: any) {
        const { data: result, error } = await supabase
            .from('hackathons')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async deleteHackathon(id: string) {
        const { error } = await supabase
            .from('hackathons')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    // Timeline
    async getTimeline(limit?: number) {
        let query = supabase.from('timeline_events').select('*');
        if (limit) query = query.limit(limit);
        const { data, error } = await query.order('event_date', { ascending: false });
        if (error) throw error;
        return data;
    }

    // Bookings
    async getBookings(status?: string) {
        let query = supabase.from('bookings').select('*');
        if (status) query = query.eq('status', status);
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }

    async createBooking(data: any) {
        const { data: result, error } = await supabase
            .from('bookings')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async updateBooking(id: string, data: any) {
        const { data: result, error } = await supabase
            .from('bookings')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return result;
    }

    async deleteBooking(id: string) {
        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }

    // Settings
    async getSettings() {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*');
        if (error) throw error;
        // Transform array to object
        return data.reduce((acc: any, curr: any) => ({ ...acc, [curr.key]: curr.value }), {});
    }

    async updateSettings(data: Record<string, string>) {
        const updates = Object.entries(data).map(([key, value]) => ({ key, value }));
        const { error } = await supabase
            .from('site_settings')
            .upsert(updates);
        if (error) throw error;
        return data;
    }

    // Upload
    async uploadFile(file: File, type: string = 'general') {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${type}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('portfolio')
            .getPublicUrl(filePath);

        return { url: publicUrl, filename: fileName };
    }

    // Education
    async getEducation(status?: string) {
        let query = supabase.from('education').select('*');
        if (status) query = query.eq('status', status);
        const { data, error } = await query.order('start_date', { ascending: false });
        if (error) throw error;
        return data;
    }
    async createEducation(data: any) {
        const { data: result, error } = await supabase.from('education').insert(data).select().single();
        if (error) throw error;
        return result;
    }
    async updateEducation(id: string, data: any) {
        const { data: result, error } = await supabase.from('education').update(data).eq('id', id).select().single();
        if (error) throw error;
        return result;
    }
    async deleteEducation(id: string) {
        const { error } = await supabase.from('education').delete().eq('id', id);
        if (error) throw error;
    }

    // Experiences
    async getExperiences(status?: string) {
        let query = supabase.from('experiences').select('*');
        if (status) query = query.eq('status', status);
        const { data, error } = await query.order('start_date', { ascending: false });
        if (error) throw error;
        return data;
    }
    async createExperience(data: any) {
        const { data: result, error } = await supabase.from('experiences').insert(data).select().single();
        if (error) throw error;
        return result;
    }
    async updateExperience(id: string, data: any) {
        const { data: result, error } = await supabase.from('experiences').update(data).eq('id', id).select().single();
        if (error) throw error;
        return result;
    }
    async deleteExperience(id: string) {
        const { error } = await supabase.from('experiences').delete().eq('id', id);
        if (error) throw error;
    }

    // Articles
    async getArticles(params?: { status?: string; category?: string; featured?: boolean; limit?: number }) {
        let query = supabase.from('articles').select('*');
        if (params?.status) query = query.eq('status', params.status);
        if (params?.category) query = query.eq('category_id', params.category);
        if (params?.featured) query = query.eq('featured', true);
        if (params?.limit) query = query.limit(params.limit);
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }
    async getArticleBySlug(slug: string) {
        const { data, error } = await supabase.from('articles').select('*').eq('slug', slug).single();
        if (error) throw error;
        return data;
    }
    async createArticle(data: any) {
        const { data: result, error } = await supabase.from('articles').insert(data).select().single();
        if (error) throw error;
        return result;
    }
    async updateArticle(id: string, data: any) {
        const { data: result, error } = await supabase.from('articles').update(data).eq('id', id).select().single();
        if (error) throw error;
        return result;
    }
    async deleteArticle(id: string) {
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (error) throw error;
    }
}

export const api = new ApiClient();

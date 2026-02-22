const API_BASE = 'http://localhost:3001/api';

class ApiClient {
    private getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    private async request<T>(
        method: string,
        endpoint: string,
        body?: any,
        isFormData?: boolean
    ): Promise<T> {
        const headers: Record<string, string> = {};
        const token = this.getToken();

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const config: RequestInit = {
            method,
            headers,
        };

        if (body) {
            config.body = isFormData ? body : JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Erreur serveur' }));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        return response.json();
    }

    // Auth
    async login(email: string, password: string) {
        const data = await this.request<{ token: string; user: any }>('POST', '/auth/login', { email, password });
        localStorage.setItem('auth_token', data.token);
        return data;
    }

    async logout() {
        await this.request('POST', '/auth/logout');
        localStorage.removeItem('auth_token');
    }

    async getMe() {
        return this.request<{ user: any }>('GET', '/auth/me');
    }

    // Categories
    async getCategories() {
        return this.request<any[]>('GET', '/categories');
    }

    async createCategory(data: any) {
        return this.request<any>('POST', '/categories', data);
    }

    async updateCategory(id: string, data: any) {
        return this.request<any>('PUT', `/categories/${id}`, data);
    }

    async deleteCategory(id: string) {
        return this.request<any>('DELETE', `/categories/${id}`);
    }

    // Projects
    async getProjects(params?: { status?: string; featured?: boolean; category?: string; limit?: number }) {
        const query = new URLSearchParams();
        if (params?.status) query.set('status', params.status);
        if (params?.featured) query.set('featured', 'true');
        if (params?.category) query.set('category', params.category);
        if (params?.limit) query.set('limit', params.limit.toString());
        const qs = query.toString();
        return this.request<any[]>('GET', `/projects${qs ? `?${qs}` : ''}`);
    }

    async getProjectBySlug(slug: string) {
        return this.request<any>('GET', `/projects/${slug}`);
    }

    async createProject(data: any) {
        return this.request<any>('POST', '/projects', data);
    }

    async updateProject(id: string, data: any) {
        return this.request<any>('PUT', `/projects/${id}`, data);
    }

    async deleteProject(id: string) {
        return this.request<any>('DELETE', `/projects/${id}`);
    }

    // Certifications
    async getCertifications(params?: { status?: string; featured?: boolean; limit?: number }) {
        const query = new URLSearchParams();
        if (params?.status) query.set('status', params.status);
        if (params?.featured) query.set('featured', 'true');
        if (params?.limit) query.set('limit', params.limit.toString());
        const qs = query.toString();
        return this.request<any[]>('GET', `/certifications${qs ? `?${qs}` : ''}`);
    }

    async createCertification(data: any) {
        return this.request<any>('POST', '/certifications', data);
    }

    async updateCertification(id: string, data: any) {
        return this.request<any>('PUT', `/certifications/${id}`, data);
    }

    async deleteCertification(id: string) {
        return this.request<any>('DELETE', `/certifications/${id}`);
    }

    // Hackathons
    async getHackathons(params?: { status?: string; featured?: boolean; limit?: number }) {
        const query = new URLSearchParams();
        if (params?.status) query.set('status', params.status);
        if (params?.featured) query.set('featured', 'true');
        if (params?.limit) query.set('limit', params.limit.toString());
        const qs = query.toString();
        return this.request<any[]>('GET', `/hackathons${qs ? `?${qs}` : ''}`);
    }

    async createHackathon(data: any) {
        return this.request<any>('POST', '/hackathons', data);
    }

    async updateHackathon(id: string, data: any) {
        return this.request<any>('PUT', `/hackathons/${id}`, data);
    }

    async deleteHackathon(id: string) {
        return this.request<any>('DELETE', `/hackathons/${id}`);
    }

    // Timeline
    async getTimeline(limit?: number) {
        const qs = limit ? `?limit=${limit}` : '';
        return this.request<any[]>('GET', `/timeline${qs}`);
    }

    // Settings
    async getSettings() {
        return this.request<Record<string, string>>('GET', '/settings');
    }

    async updateSettings(data: Record<string, string>) {
        return this.request<Record<string, string>>('PUT', '/settings', data);
    }

    // Upload
    async uploadFile(file: File, type: string = 'general') {
        const formData = new FormData();
        formData.append('file', file);
        return this.request<{ url: string; filename: string }>('POST', `/upload?type=${type}`, formData, true);
    }

    async uploadFiles(files: File[], type: string = 'general') {
        const formData = new FormData();
        files.forEach(f => formData.append('files', f));
        return this.request<{ url: string; filename: string }[]>('POST', `/upload/multiple?type=${type}`, formData, true);
    }

    // Education
    async getEducation(status?: string) {
        const qs = status ? `?status=${status}` : '';
        return this.request<any[]>('GET', `/education${qs}`);
    }
    async createEducation(data: any) { return this.request<any>('POST', '/education', data); }
    async updateEducation(id: string, data: any) { return this.request<any>('PUT', `/education/${id}`, data); }
    async deleteEducation(id: string) { return this.request<any>('DELETE', `/education/${id}`); }

    // Experiences
    async getExperiences(status?: string) {
        const qs = status ? `?status=${status}` : '';
        return this.request<any[]>('GET', `/experiences${qs}`);
    }
    async createExperience(data: any) { return this.request<any>('POST', '/experiences', data); }
    async updateExperience(id: string, data: any) { return this.request<any>('PUT', `/experiences/${id}`, data); }
    async deleteExperience(id: string) { return this.request<any>('DELETE', `/experiences/${id}`); }

    // Articles
    async getArticles(params?: { status?: string; category?: string; featured?: boolean; limit?: number }) {
        const query = new URLSearchParams();
        if (params?.status) query.set('status', params.status);
        if (params?.category) query.set('category', params.category);
        if (params?.featured) query.set('featured', 'true');
        if (params?.limit) query.set('limit', params.limit.toString());
        const qs = query.toString();
        return this.request<any[]>('GET', `/articles${qs ? `?${qs}` : ''}`);
    }
    async getArticleBySlug(slug: string) { return this.request<any>('GET', `/articles/${slug}`); }
    async createArticle(data: any) { return this.request<any>('POST', '/articles', data); }
    async updateArticle(id: string, data: any) { return this.request<any>('PUT', `/articles/${id}`, data); }
    async deleteArticle(id: string) { return this.request<any>('DELETE', `/articles/${id}`); }

    // Bookings
    async getBookings(status?: string) {
        const qs = status ? `?status=${status}` : '';
        return this.request<any[]>('GET', `/bookings${qs}`);
    }
    async createBooking(data: any) { return this.request<any>('POST', '/bookings', data); }
    async updateBooking(id: string, data: any) { return this.request<any>('PUT', `/bookings/${id}`, data); }
    async deleteBooking(id: string) { return this.request<any>('DELETE', `/bookings/${id}`); }
}

export const api = new ApiClient();


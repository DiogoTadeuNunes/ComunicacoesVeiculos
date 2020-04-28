export class Post {
    id: number;
    createdAt: string;
    projectKey: string;
    title: string;
    content: string;
    files;

    constructor(dados?: any) {
        this.id = dados? dados.id : ''
        this.createdAt = dados? dados.createdAt : ''
        this.projectKey = 'HubVeiculos';
        this.title = dados? dados.title : '';
        this.content = dados? dados.content : '';
        this.files = [];
    }
}

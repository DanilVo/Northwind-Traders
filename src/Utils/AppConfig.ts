class AppConfig {
    public readonly productsUrl: string = "http://localhost:3030/api/products/"
    public readonly employeesUrl: string = "http://localhost:3030/api/employees/"
    public readonly suppliersUrl: string = "http://localhost:3030/api/suppliers/"
    public readonly categoriesUrl: string = "http://localhost:3030/api/categories/"
    public readonly contactUsUrl: string = "http://localhost:3030/api/contact-us/"
    public readonly registerUrl: string = "http://localhost:3030/api/register/"
    public readonly loginUrl: string = "http://localhost:3030/api/login/"
    public readonly refreshTokenUrl: string = "http://localhost:3030/api/refresh-token/"
}

const appConfig = new AppConfig();
export default appConfig
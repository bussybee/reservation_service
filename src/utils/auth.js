export const isUserAuthenticated = () => {
    // Предположим, что у нас есть логика для проверки авторизации, например, проверка наличия токена доступа в localStorage
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
}
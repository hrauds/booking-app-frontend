export const requireAuth = (to, from, next) => {
    const isLoggedIn = localStorage.getItem('user-token');
    if (isLoggedIn) {
        next();
    } else {
        next('/');
    }
};

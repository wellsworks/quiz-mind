// replace token-based logic after switching to HTTPOnly cookies

export function saveToken(token: string) {
    // replace local storage later
    localStorage.setItem("access_token", token);
}

export function getToken(): string | null {
    // replace with cookies later
    return typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
}

export function clearToken() {
    localStorage.removeItem("access_token");
}

export function isLoggedIn(): boolean {
    return !!getToken();
}
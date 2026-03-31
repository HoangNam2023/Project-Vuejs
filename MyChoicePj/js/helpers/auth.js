export async function checkLogin() {
  try {
    const res = await fetch('http://localhost/project-vuejs/MyChoicePj/api/modules/login/checkLogin.php', {
      credentials: 'include' // QUAN TRỌNG để gửi session cookie
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return { logged_in: false };
  }
}
export async function logout() {
  await fetch('http://localhost/project-vuejs/MyChoicePj/api/modules/login/logout.php', {
    credentials: 'include'
  });
}

const FooterAdminTemplate = await fetch('./template/Components/footer_admin.html').then(r => r.text());
// Đây là component footer admin
const FooterAdmin = {
  template: FooterAdminTemplate
}

export default FooterAdmin;
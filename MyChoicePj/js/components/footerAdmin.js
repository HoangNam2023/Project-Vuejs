const FooterAdminTemplate = await fetch('./html/template/components/footer_admin.html').then(r => r.text());
// Đây là component footer admin
const FooterAdmin = {
  template: FooterAdminTemplate
}

export default FooterAdmin;
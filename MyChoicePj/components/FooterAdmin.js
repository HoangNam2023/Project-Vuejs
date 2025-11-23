const FooterAdminTemplate = await fetch('./template/Components/footer_admin.html').then(r => r.text());
const FooterAdmin = {
  template: FooterAdminTemplate
}

export default FooterAdmin;
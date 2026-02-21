const MenuAdminTemplate = await fetch('./html/templates/components/menu_admin.html').then(r => r.text());
// Đây là component menu admin
const MenuAdmin = {
  template: MenuAdminTemplate
}

export default MenuAdmin;
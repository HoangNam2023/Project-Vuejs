const MenuAdminTemplate = await fetch('./template/Components/menu_admin.html').then(r => r.text());
const MenuAdmin = {
  template: MenuAdminTemplate
}

export default MenuAdmin;
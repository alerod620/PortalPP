<template>
  <div class="wrapper">
      <side-bar>
          <template slot="links">
              <!-- <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" /> -->
              <!-- <sidebar-link to="/stats" name="User Profile" icon="ti-user" /> -->
              <sidebar-link to="/menu" name="Menu" icon="bars" />
              <!-- <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt" />
              <sidebar-link to="/typography" name="Typography" icon="ti-text" />
              <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2" />
              <sidebar-link to="/maps" name="Map" icon="ti-map" />
              <sidebar-link to="/notifications" name="Notifications" icon="ti-bell" /> -->
              <sidebar-link to="/usuarios" name="Usuarios" icon="users" />
                  <!-- <font-awesome-icon :icon="['fas', 'file-prescription']" class="pr-2" style="font-size: 16px" /> -->
              <sidebar-link to="/solicitudes" name="Solicitudes" icon="bell" />
              <sidebar-link to="/modulos" name="Módulos" icon="gears" />
              <sidebar-link to="/permisos" name="Permisos" icon="key" />
              <sidebar-link to="/roles" name="Roles" icon="user-gear" />
              <sidebar-link to="/publicaciones" name="Publicaciones" icon="newspaper" />
              <sidebar-link to="/recibos" name="Recibos" icon="check-square" />
              <sidebar-link to="/declaracionbeneficiarios" name="Beneficiarios" icon="child" />
              <sidebar-link to="/inicio" name="Inicio" icon="tachometer" />
              <sidebar-link to="/landing" name="Landing page" icon="home" />
              <sidebar-link to="/menuCertificaciones" name="Landing page" icon="home" />
          </template>
          <mobile-menu>
              <li class="nav-item">
                  <a class="nav-link">
                      <i class="ti-panel"></i>
                      <p>Stats</p>
                  </a>
              </li>
              <drop-down class="nav-item" title="5 Notifications" title-classes="nav-link" icon="ti-bell">
                  <a class="dropdown-item">Notification 1</a>
                  <a class="dropdown-item">Notification 2</a>
                  <a class="dropdown-item">Notification 3</a>
                  <a class="dropdown-item">Notification 4</a>
                  <a class="dropdown-item">Another notification</a>
              </drop-down>
              <li class="nav-item">
                  <a class="nav-link">
                      <i class="ti-settings"></i>
                      <p>Settings</p>
                  </a>
              </li>
              <li class="divider"></li>
          </mobile-menu>
      </side-bar>
      <div class="main-panel">
          <!-- <top-navbar></top-navbar>-->
  
          <dashboard-content @click.native="toggleSidebar"> </dashboard-content>
  
          <!--<content-footer></content-footer>-->
      </div>
  </div>
  </template>
  
  <style lang="scss"></style>
  
  <script>
  import TopNavbar from "./TopNavbar.vue";
  import ContentFooter from "./ContentFooter.vue";
  import DashboardContent from "./Content.vue";
  import MobileMenu from "./MobileMenu";
  export default {
      components: {
          TopNavbar,
          ContentFooter,
          DashboardContent,
          MobileMenu,
      },
      methods: {
          toggleSidebar() {
              if (this.$sidebar.showSidebar) {
                  this.$sidebar.displaySidebar(false);
              }
          },
      },
  };
  </script>
  
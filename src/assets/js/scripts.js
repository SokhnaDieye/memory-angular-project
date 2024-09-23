/*!
    * Start Bootstrap - SB Admin v7.0.4 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
/*// Toggle the side navigation
  const navbarDropdown = document.body.querySelector('#navbarDropdown');
  if (navbarDropdown) {
    navbarDropdown.addEventListener('click', event => {
      event.preventDefault();
      document.body.classList.toggle('dropdown-menu');
      localStorage.setItem('dropdown-menu', document.body.classList.contains('dropdown-menu'));
    });
  }*/
  const navbarDropdown = document.body.querySelector('#navbarDropdown');
  const dropdownMenu = document.body.querySelector('.dropdown-menu');

  if (navbarDropdown && dropdownMenu) {
    navbarDropdown.addEventListener('click', event => {
      event.preventDefault();
      dropdownMenu.classList.toggle('show');
    });

    // Close the dropdown if clicking outside of it
    document.addEventListener('click', event => {
      if (!navbarDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  }


});


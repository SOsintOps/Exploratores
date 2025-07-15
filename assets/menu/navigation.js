const navHTML = `
<nav>
  <ul class="menu">
    <li><span>HOME</span>
      <ul class="submenu">
        <li><a href="../launchme.html">Index</a></li>
      </ul>
    </li>
    <li><span>Search<br>Engines</span>
      <ul class="submenu">
        <li><a href="Searchengines.html">Search Engines</a></li>
      </ul>
    </li>
    <li><span>People &<br>Identities</span>
      <ul class="submenu">
        <li><a href="Names.html">Names</a></li>
        <li><a href="phoneus.html">US Phones</a></li>
        <li><a href="phoneint.html">International Phones</a></li>
        <li><a href="vehicles.html">Vehicles</a></li>
        <li><a href="usernames.html">Usernames</a></li>
        <li><a href="Email.html">Email Addresses</a></li>
        <li><a href="Communities.html">Communities</a></li>
      </ul>
    </li>
    <li><span>Social<br>Media</span>
      <ul class="submenu">
        <li><a href="X.html">X (Twitter)</a></li>
        <li><a href="facebook.html">Facebook</a></li>
        <li><a href="instagram.html">Instagram</a></li>
        <li><a href="linkedin.html">LinkedIn</a></li>
        <li><a href="keybase.html">Keybase</a></li>
        <li><a href="vk.html">VK</a></li>
      </ul>
    </li>
    <li><span>Websites</span>
      <ul class="submenu">
        <li><a href="Domains.html">Domains</a></li>
        <li><a href="IP.html">IP Addresses</a></li>
      </ul>
    </li>
    <li><span>GeoInt</span>
      <ul class="submenu">
        <li><a href="Maps.html">Maps</a></li>
        <li><a href="Address.html">Addresses</a></li>
      </ul>
    </li>
    <li><span>Media<br>Analysis</span>
      <ul class="submenu">
        <li><a href="Images.html">Images</a></li>
        <li><a href="Videos.html">Videos</a></li>
        <li><a href="docs.html">Documents</a></li>
      </ul>
    </li>
    <li><span>Company<br>Public Records</span>
      <ul class="submenu">
        <li><a href="PublicCompanyRecords.html">Company Public Records</a></li>
        <li><a href="Currencies.html">Virtual Currencies</a></li>
      </ul>
    </li>
    <li><span>Tools</span>
      <ul class="submenu">
        <li><a href="Guidelines.html">Guidelines</a></li>
        <li><a href="CyberChef.html">CyberChef</a></li>
        <li><a href="customise.html">Customise</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="license.html">License</a></li>
      </ul>
    </li>
  </ul>
</nav>
`;

const placeholder = document.getElementById('navbar-placeholder');
if (placeholder) {
  placeholder.innerHTML = navHTML;

  const menuItems = placeholder.querySelectorAll('.menu > li');
  menuItems.forEach(item => {
    const submenu = item.querySelector('.submenu');
    if (submenu) {
      item.addEventListener('mouseover', () => { submenu.style.display = 'block'; });
      item.addEventListener('mouseout', () => { submenu.style.display = 'none'; });
    }
  });
}
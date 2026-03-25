function generateNavHTML() {
    const isRoot = !window.location.pathname.includes('/pages/');

    const rootPath = isRoot ? '' : '../';
    const pagesPath = isRoot ? 'pages/' : '';
    const toolsPath = isRoot ? 'tools/' : '../tools/';

    return `
    <nav>
      <ul class="menu">
        <li><span>HOME</span>
          <ul class="submenu">
            <li><a href="${rootPath}launchme.html">Index</a></li>
          </ul>
        </li>
        <li><span>Search<br>Engines</span>
          <ul class="submenu">
            <li><a href="${pagesPath}searchengines.html">Search Engines</a></li>
          </ul>
        </li>
        <li><span>People &<br>Identities</span>
          <ul class="submenu">
            <li><a href="${pagesPath}names.html">Names</a></li>
            <li><a href="${pagesPath}phoneus.html">US Phones</a></li>
            <li><a href="${pagesPath}phoneint.html">International Phones</a></li>
            <li><a href="${pagesPath}vehicles.html">Vehicles</a></li>
            <li><a href="${pagesPath}usernames.html">Usernames</a></li>
            <li><a href="${pagesPath}email.html">Email Addresses</a></li>
            <li><a href="${pagesPath}communities.html">Communities</a></li>
          </ul>
        </li>
        <li><span>Social<br>Media</span>
          <ul class="submenu">
            <li><a href="${pagesPath}x.html">X (Twitter)</a></li>
            <li><a href="${pagesPath}facebook.html">Facebook</a></li>
            <li><a href="${pagesPath}instagram.html">Instagram</a></li>
            <li><a href="${pagesPath}linkedin.html">LinkedIn</a></li>
            <li><a href="${pagesPath}vk.html">VK</a></li>
            <li><a href="${pagesPath}keybase.html">Keybase</a></li>
          </ul>
        </li>
        <li><span>Websites</span>
          <ul class="submenu">
            <li><a href="${pagesPath}domains.html">Domains</a></li>
            <li><a href="${pagesPath}ip.html">IP Addresses</a></li>
          </ul>
        </li>
        <li><span>GeoInt</span>
          <ul class="submenu">
            <li><a href="${pagesPath}maps.html">Maps</a></li>
            <li><a href="${pagesPath}address.html">Addresses</a></li>
          </ul>
        </li>
        <li><span>Media<br>Analysis</span>
          <ul class="submenu">
            <li><a href="${pagesPath}images.html">Images</a></li>
            <li><a href="${pagesPath}videos.html">Videos</a></li>
            <li><a href="${pagesPath}docs.html">Documents</a></li>
          </ul>
        </li>
        <li><span>Company<br>Public Records</span>
          <ul class="submenu">
            <li><a href="${pagesPath}publiccompanyrecords.html">Company Public Records</a></li>
            <li><a href="${pagesPath}currencies.html">Virtual Currencies</a></li>
            <li><a href="${pagesPath}iban.html">IBAN</a></li>
          </ul>
        </li>
        <li><span>Tools</span>
          <ul class="submenu">
            <li><a href="${pagesPath}cyberchef.html">CyberChef</a></li>
            <li><a href="${pagesPath}guidelines.html">Guidelines</a></li>
            <li><a href="${pagesPath}customise.html">Customise</a></li>
            <li><a href="${pagesPath}faq.html">FAQ</a></li>
            <li><a href="${pagesPath}versionhistory.html">Version History</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    `;
}

const placeholder = document.getElementById('navbar-placeholder');
if (placeholder) {
  placeholder.innerHTML = generateNavHTML();

  const menuItems = placeholder.querySelectorAll('.menu > li');
  menuItems.forEach(item => {
    const submenu = item.querySelector('.submenu');
    if (submenu) {
      item.addEventListener('mouseover', () => { submenu.style.display = 'block'; });
      item.addEventListener('mouseout', () => { submenu.style.display = 'none'; });
    }
  });
}
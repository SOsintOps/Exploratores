// =================================================================
// EXPLORATORES TOOLKIT - LIGHT VERSION CONFIGURATION
// =================================================================
// In this file, you can decide which elements to hide when the
// "light" version is active.

const exploratoresConfig = {

  // Set to 'true' to enable the light version and hide the elements listed below.
  // Set to 'false' to show all elements (full version).
  lightVersionEnabled: false, 

  // This is the list of elements to hide.
  // Use CSS selectors to identify them.
  selectorsToHide: [
    
    // EXAMPLES OF HOW TO USE SELECTORS:
    // You can use an ID to hide a specific button
    // Example: '#vkSmatSearchButton',

    // You can use a class to hide all elements with that class
    // Example: '.some-button-class-to-hide',

    // You can use an attribute selector to hide specific buttons
    // Example: '[onclick="VK_OpenGifts()"]',

    // You can hide entire sections (first, you should add a class to the section in your HTML)
    // Example: '.section-advanced-tools',
    
    // =============================================================
    // ADD YOUR SELECTORS HERE
    // =============================================================
    
    // Example to get started: hides the "External & Related Searches" section on the VK page.
    // To make this work, you would first add class="vk-external-searches" 
    // to the corresponding h2 or section element in the vk.html file.
    // '.vk-external-searches'

  ]
};
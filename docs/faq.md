# Frequently Asked Questions (FAQ)

## Table of Contents

* [Why is the toolkit named "Exploratores"?](#why-is-the-toolkit-named-exploratores)
* [Who were the "Exploratores" historically?](#who-were-the-exploratores-historically)
* [What is the main purpose of the Exploratores OSINT Toolkit?](#what-is-the-main-purpose-of-the-exploratores-osint-toolkit)
* [Can I use the Exploratores OSINT Toolkit outside of my team?](#can-i-use-the-exploratores-osint-toolkit-outside-of-my-team)
* [Is the Exploratores OSINT Toolkit covered by any warranty?](#is-the-exploratores-osint-toolkit-covered-by-any-warranty)
* [Are there any guarantees regarding the accuracy or reliability of the tools and results?](#are-there-any-guarantees-regarding-the-accuracy-or-reliability-of-the-tools-and-results)
* [Am I responsible for validating information found using the toolkit?](#am-i-responsible-for-validating-information-found-using-the-toolkit)
* [Where can I find resources to learn more about OSINT?](#where-can-i-find-resources-to-learn-more-about-osint)
* [What are some basic OPSEC best practices when using this toolkit?](#what-are-some-basic-opsec-best-practices-when-using-this-toolkit)
* [What are the ethical guidelines for using these tools?](#what-are-the-ethical-guidelines-for-using-these-tools)
* [Do I need to install additional software to use the toolkit?](#do-i-need-to-install-additional-software-to-use-the-toolkit)
* [Are my search activities tracked by the toolkit?](#are-my-search-activities-tracked-by-the-toolkit)
* [Is it necessary to create dedicated investigative accounts for using some of these tools?](#is-it-necessary-to-create-dedicated-investigative-accounts-for-using-some-of-these-tools)
* [Can the Exploratores OSINT Toolkit pages be customized?](#can-the-exploratores-osint-toolkit-pages-be-customized)
* [How is the maintenance of tools within the toolkit handled?](#how-is-the-maintenance-of-tools-within-the-toolkit-handled)
* [How can I suggest new tools or improvements?](#how-can-i-suggest-new-tools-or-improvements)
* [What is the recommended workflow for contributing a new page?](#what-is-the-recommended-workflow-for-contributing-a-new-page)
* [How can I create a new page or add features using a prompt for an LLM?](#how-can-i-create-a-new-page-or-add-features-using-a-prompt-for-an-llm)
* [Can you provide an example prompt for an LLM to create a basic Exploratores page template from scratch?](#can-you-provide-an-example-prompt-for-an-llm-to-create-a-basic-exploratores-page-template-from-scratch)
* [Were any Large Language Models (LLMs) unduly stressed during the creation of this toolkit?](#were-any-large-language-models-llms-unduly-stressed-during-the-creation-of-this-toolkit)
* [What is the logic behind the new "Data-Driven" system?](#what-is-the-logic-behind-the-new-data-driven-system)
* [How does the page state management (`updatePageState`) work?](#how-does-the-page-state-management-updatepagestate-work)
* [What are the steps to add a new search button?](#what-are-the-steps-to-add-a-new-search-button)
* [What should I check if a button click does nothing?](#what-should-i-check-if-a-button-click-does-nothing)
* [What is the "Light Version" for?](#what-is-the-light-version-for)

## About the Toolkit & Its Name

### Why is the toolkit named "Exploratores"?

"Exploratores" were the scouts or reconnaissance units in the Roman army, tasked with gathering intelligence about the terrain, enemy movements, and local resources ahead of the main legionary force. This toolkit is named in their spirit, aiming to provide modern digital "scouts" (OSINT practitioners) with the tools to explore the digital landscape and gather information effectively.

### Who were the "Exploratores" historically?

In ancient Rome, "Exploratores" were soldiers specifically chosen for their skills in reconnaissance, observation, and survival. They often operated in small groups, deep in potentially hostile territory, to provide crucial intelligence for military commanders, enabling informed strategic decisions. Their role was vital for the safety and success of military campaigns.

### What is the main purpose of the Exploratores OSINT Toolkit?

The Exploratores OSINT Toolkit aims to consolidate and organize a wide range of OSINT (Open Source Intelligence) tools and resources to facilitate investigation and information gathering activities. It provides a centralized access point and a consistent structure for these tools.

## Usage & Authorization

### Can I use the Exploratores OSINT Toolkit outside of my team?

Yes. You can distribute, share, and customize explorers as needed. However, You will be responsible for any unapproved purposes or inappropriate use of this tool.

### Is the Exploratores OSINT Toolkit covered by any warranty?

No, the Exploratores OSINT Toolkit is provided "as is," without any warranty of any kind, either expressed or implied. This includes, but is not limited to, warranties of merchantability or fitness for a particular purpose.

### Are there any guarantees regarding the accuracy or reliability of the tools and results?

No guarantees are provided regarding the accuracy, completeness, reliability, or timeliness of the information obtained through the tools accessible via the toolkit. Each external tool has its own terms of service and limitations. The analyst is fully responsible for independently verifying and validating all collected information before using it for any purpose.

### Am I responsible for validating information found using the toolkit?

Yes, absolutely. The Exploratores OSINT Toolkit provides access to various tools and external resources. However, any information, data, or "news" obtained through these tools must be critically evaluated and independently validated by you, the analyst, before being considered reliable or actionable. The toolkit itself does not verify the accuracy or truthfulness of the data retrieved from external sources.

## Learning & Best Practices

### Where can I find resources to learn more about OSINT?

For a structured approach, Michael Bazzell's books (like "Open Source Intelligence Techniques") are industry-standard references. Additionally, following specialized blogs, participating in webinars, and joining professional OSINT communities are crucial for staying updated on the latest techniques and tools.

### What are some basic OPSEC best practices when using this toolkit?

Operational Security (OPSEC) is critical. While using this toolkit, always consider:

* **Network Anonymity:** Use a trusted VPN or the Tor network to mask your real IP address.
* **Dedicated Environment:** Conduct investigations from a dedicated virtual machine (VM) or a separate physical device to prevent cross-contamination with your personal data.
* **Browser Fingerprinting:** Be aware that websites can identify you through your browser's unique configuration. Use browsers or browser extensions designed to minimize fingerprinting.
* **Non-Attributable Accounts:** As mentioned below, always use dedicated, non-personal accounts for interacting with online services.

### What are the ethical guidelines for using these tools?

Ethical use is paramount. Always act within legal and jurisdictional boundaries. The purpose of these tools is for legitimate intelligence gathering on authorized targets. Never use them for harassment, illegal surveillance, or any activity that violates privacy laws or terms of service of the platforms being accessed. The responsibility for ethical conduct lies entirely with the analyst.

## Functionality & Customization

### Do I need to install additional software to use the toolkit?

No, the toolkit consists of HTML, CSS, and JavaScript pages that run directly in a modern web browser. No specific client-side software installation is required, apart from the browser itself. Linked external tools may have their own requirements.

### Are my search activities tracked by the toolkit?

The Exploratores toolkit itself does not implement any tracking or logging of your specific queries. However, each external service or website you access through the toolkit operates under its own privacy policies and may log your interactions. Always use safe Browse practices.

### Is it necessary to create dedicated investigative accounts for using some of these tools?

Yes, for many OSINT activities, it is highly recommended to use dedicated, non-attributable "investigative" or "sock puppet" accounts. Using personal accounts can compromise your investigation, expose your identity, and may violate the terms of service of some platforms.

### Can the Exploratores OSINT Toolkit pages be customized?

Yes, the toolkit is designed to be customizable. You can add new tools, modify existing categories, or adapt functionalities. For a detailed guide on how to do this, please refer to the [How to Customize Pages](customise.md) page.

## Maintenance & Contribution

### How is the maintenance of tools within the toolkit handled?

The Exploratores OSINT Toolkit was created and is carried forward as a side project. Ongoing maintenance, updating links, removing obsolete tools, and adding new ones is managed in free time and may take time.

### How can I suggest new tools or improvements?

To report errors or request new functionalities, use the GitHub reporting procedures and communication channels. This will ensure direct feedback.

### What is the recommended workflow for contributing a new page?

The standard workflow for contributing is:

1.  **Create the HTML file:** Build the new page in the `pages/` directory, following all project standards (no `onclick`, use `data-search-id`, etc.).
2.  **Update `validators.js`:** Add a new validation function if the existing ones are not suitable.
3.  **Update `search-library.js`:** Add the configuration objects for all the new buttons on your page.
4.  **Update `navigation.js`:** Add a link to your new page in the appropriate submenu.
5.  **Submit for Review:** Follow the established contribution process (e.g., submitting a pull request on GitHub).

## LLMs and Toolkit Development

### How can I create a new page or add features using a prompt for an LLM?

To interact effectively with a Large Language Model (LLM) for developing pages or features, provide a clear and detailed prompt. Key elements to include are:

* **Clear Objective**: Precisely describe what the new page or feature should do.
* **Adherence to Architecture**: Explicitly state that the new page must follow the established data-driven architecture (main.js, validators.js, search-library.js).
* **No Inline Logic**: Specify that buttons must use `data-search-id` and not `onclick`.
* **Reference to Project Guidelines**: Remind the LLM to adhere to all established project standards, including file naming and CSS classes.

### Can you provide an example prompt for an LLM to create a basic Exploratores page template from scratch?

Certainly. Here is an updated prompt that reflects the current project architecture:
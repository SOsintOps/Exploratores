# Project Guidelines

## Exploratores Toolkit: User Guide

**Welcome to Exploratores**, an OSINT toolkit developed to support the Osint Team's investigations by providing a curated collection of direct search links and resources.

### Getting Started

To effectively utilize the Exploratores toolkit, please consider the following:

*   **Prerequisites:** For optimal functionality and access to certain resources, ensure you have Tor Browser installed and an active VPN connection. Investigative accounts for various platforms (e.g., Facebook, LinkedIn, Twitter/X) are necessary for many social media and people search tools.
*   **Ethical Use:** All tools and resources within Exploratores must be used in accordance with applicable laws, regulations, and your company policies. Conduct all activities with the highest ethical standards.

### How to Use Exploratores

*   **Navigate:** Use the top navigation menu to explore thematic investigative areas.
*   **Input Data:** On each tool page, enter your specific queries into the appropriate input fields.
*   **Select Tools:** Click the buttons to query external resources. Searches will open in new browser tabs.
*   **Analyze & Correlate:** Information obtained requires careful analysis, correlation, and critical verification.
*   **OPSEC (Operational Security):** Always apply sound OPSEC precautions during your investigative activities.

### Overview of Tool Categories

The toolkit is organized into several key investigative areas. To add or customise any page, please refer to the [Customising Exploratores Pages](customise.md) page.

**NOTE:** Information sources and online tools can change frequently. If a particular link or tool is broken or outdated, refer to internal documentation or team resources for alternatives.

## Developer Guidelines

This section outlines the technical standards for maintaining and extending the Exploratores toolkit.

*   **Separation of Concerns:** The project strictly separates structure (HTML), presentation (CSS), and logic (JavaScript). No inline styles or scripts are permitted in HTML files.
*   **JavaScript Architecture:** All pages must adhere to the central, data-driven architecture powered by `main.js`, `validators.js`, and `search-library.js`.
*   **File Naming:** All HTML files must use lowercase names (e.g., `new_page.html`).
*   **ID & Data Attribute Conventions:**
    *   Element `id` attributes must follow the `[type]-[page]-[name]` format (e.g., `btn-names-us-fastpeople`).
    *   `data-search-id` attributes must follow the `[page]-[name]` format and match a key in `search-library.js`.
*   **Contribution Workflow:** All new features or pages must be developed in separate branches and submitted for review, ensuring they adhere to all established guidelines.
*   **Code Commenting:** Do not add explanatory comments to the code. All explanations must be provided in documentation or commit messages.

## Global Security Analytic Standards: THE DRAFT FRAMEWORK

**Important Disclaimer:** The following standards are for internal Osint Team reference and are intended to complement, not replace, any company policies. In case of any conflict, company documentation takes precedence.

**Bottom Line Up Front (BLUF):** Adherence to the five Core Analytic Standards and nine Analytic Tradecraft Standards outlined below is mandatory for all Global Security intelligence products.

### The Five Analytic Standards

**Objective:** Analysts must perform their functions with objectivity, be aware of their own assumptions, and employ reasoning techniques to mitigate bias.

**Independent of political consideration:** Analytic assessments must not be distorted by advocacy of a particular audience, agenda, or policy viewpoint.

**Timely:** Analysis must be disseminated in time for it to be actionable by stakeholders.

**Based on all available sources of intelligence information:** Analysis should be informed by all relevant available information and address critical information gaps.

**Implements and exhibits Analytic Tradecraft Standards:** This standard serves as an overarching requirement for the nine standards below.

### The Nine Analytic Tradecraft Standards

1.  **Properly describes quality and credibility of underlying sources, data, and methodologies.**
2.  **Properly expresses and explains uncertainties associated with major analytic judgments.** For expressions of likelihood, an analytic product must use standardized sets of terms, such as these:

| Almost No Chance | Very Unlikely | Unlikely | Roughly Even Chance | Likely | Very Likely | Almost Certain(ly) |
| :--------------- | :------------ | :------- | :------------------ | :----- | :---------- | :----------------- |
| Remote           | Highly Improbable | Improbable | Roughly Even Odds   | Probable | Highly Probable | Nearly Certain     |
| 01-05%           | 05-20%        | 20-45%   | 45-55%              | 55-80% | 80-95%      | 95-99%             |

3.  **Properly distinguishes between underlying intelligence information and analysts’ assumptions and judgments.**
4.  **Incorporates analysis of alternatives** by systematically evaluating differing hypotheses.
5.  **Demonstrates stakeholder relevance and addresses implications** for action.
6.  **Uses clear and logical argumentation** with a clear main message supported by coherent reasoning.
7.  **Explicitly explains change to or consistency of analytic judgments** compared to previous analysis.
8.  **Makes accurate judgments and assessments** based on available information and known gaps.
9.  **Incorporates effective visual information where appropriate** to clarify the analytic message.

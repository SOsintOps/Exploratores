# Intelligence Analysis Guidelines

Analytic standards, source evaluation, the 5W1H method, OPSEC and report writing, applied to investigations run with Exploratores. The common method of all the SOsintOps tools is kept in the [Intelligence Field Notes](https://github.com/SOsintOps/intelligence-field-notes): personal notes, shared for convenience and with no claim to be exhaustive. A copy for offline use is in [`docs/field-notes/`](field-notes/README.md). This page summarises it and adds what is specific to a browser toolkit.

## Core Analytic Standards
Adherence to the five Core Analytic Standards is mandatory for all intelligence products. These standards ensure the rigour and integrity of the analysis.

### The Five Analytic Standards
**Objective:** Analysts must perform their functions with objectivity, be aware of their own assumptions, and employ reasoning techniques to mitigate bias.

**Independent of political consideration:** Analytic assessments must not be distorted by advocacy of a particular audience, agenda, or policy viewpoint.

**Timely:** Analysis must be disseminated in time for it to be actionable by stakeholders.

**Based on all available sources of intelligence information:** Analysis should be informed by all relevant available information and address critical information gaps.

**Implements and exhibits Analytic Tradecraft Standards:** This standard serves as an overarching requirement for the nine standards below.

### The Nine Analytic Tradecraft Standards
1.  Properly describes quality and credibility of underlying sources, data, and methodologies.
2.  Properly expresses and explains uncertainties associated with major analytic judgments. For expressions of likelihood, an analytic product must use standardised sets of terms:

| Almost No Chance | Very Unlikely | Unlikely | Roughly Even Chance | Likely | Very Likely | Almost Certain(ly) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Remote | Highly Improbable | Improbable | Roughly Even Odds | Probable | Highly Probable | Nearly Certain |
| 01-05% | 05-20% | 20-45% | 45-55% | 55-80% | 80-95% | 95-99% |

Choose **one row** and keep to it: ICD 203 discourages mixing terms from different rows (the SOsintOps templates use the first). Never put a confidence level (high, moderate, low) and a likelihood term in the same sentence. See [Estimative Language](field-notes/estimative-language.md).

3.  Properly distinguishes between underlying intelligence information and analysts’ assumptions and judgments.
4.  Incorporates analysis of alternatives by systematically evaluating differing hypotheses.
5.  Demonstrates stakeholder relevance and addresses implications for action.
6.  Uses clear and logical argumentation with a clear main message supported by coherent reasoning.
7.  Explicitly explains change to or consistency of analytic judgments compared to previous analysis.
8.  Makes accurate judgments and assessments based on available information and known gaps.
9.  Incorporates effective visual information where appropriate to clarify the analytic message.

## Source Evaluation
Every item you find through Exploratores is graded before it is used, with the **UNODC 4 x 4 system** shared by all the SOsintOps tools. Grade the source and the information separately and write them together, for example `B2`.

| Source | Meaning |
| :--- | :--- |
| **A** | No doubt about reliability; history of complete reliability |
| **B** | Mostly reliable in the past |
| **C** | Mostly unreliable in the past |
| **X** | Reliability cannot be judged |

| Information | Meaning |
| :--- | :--- |
| **1** | No doubt about accuracy |
| **2** | Known personally to the source; logical; agrees with other information |
| **3** | Not known personally to the source, but corroborated |
| **4** | Not known personally to the source and not corroborated |

The website a button opens is not the source: the source is whoever produced the record (the company registry, the account holder, the journalist). See [Source Evaluation](field-notes/source-evaluation.md).

## The 5W1H Analytical Method
The 5W1H method (Who, What, When, Where, Why, How) is a cognitive tool that imposes order on chaotic data streams, enhances analytical clarity, and provides a structured pathway for transforming raw open-source information into finished intelligence. It serves as a safeguard against common analytical pitfalls and cognitive biases, such as confirmation bias and tunnel vision.

### The Six Components
#### Who: Identifying Actors and Networks
This component focuses on identifying all individuals, companies, or entities connected to the investigation. It moves beyond simple identification to focus on the relationships, motivations, and structures of the individuals and groups involved.
- **Guiding Question:** Who are the primary and secondary actors (individuals, groups, organisations)?
- **Guiding Question:** Who are the key nodes and influencers within the network?
- **Guiding Question:** Who provides financial, logistical, or ideological support?

#### What: Defining the Event and Assets
This element involves understanding the core incident or event and setting the focus of the investigation. It seeks to clearly define the nature of the event, action, or capability being investigated.
- **Guiding Question:** What specific event or activity is under investigation?
- **Guiding Question:** What capabilities or TTPs (Tactics, Techniques, and Procedures) were demonstrated?
- **Guiding Question:** What specific vulnerability was exploited?

#### When: Establishing the Temporal Dimension
This dimension addresses timeline matters and temporal context. It is the foundation of timeline analysis, placing events in a chronological context to reveal patterns, triggers, and sequences.
- **Guiding Question:** What is the precise start and end date/time of the event?
- **Guiding Question:** What is the full timeline of significant actions?
- **Guiding Question:** Is there a discernible pattern related to time-of-day, day-of-week, or season?

#### Where: Pinpointing Location and Jurisdiction
This component encompasses both physical and digital locations relevant to the investigation. It is crucial for understanding the operational environment and applicable constraints.
- **Guiding Question:** Where is the physical location (country, city, address, coordinates)?
- **Guiding Question:** Where is the digital location (website, IP address, social platform, forum)?
- **Guiding Question:** What legal or administrative jurisdictions apply to the location?

#### Why: Assessing Intent and Motivation
This is often the most critical and challenging question, as it seeks to uncover the underlying purpose or motive behind an action. Answering "Why" is essential for assessing threats and predicting future behaviour.
- **Guiding Question:** What is the stated or inferred motive (e.g., financial, political, ideological, personal)?
- **Guiding Question:** Why was this specific target, timing, or method chosen over others?
- **Guiding Question:** What is the root cause of the problem or event?

#### How: Detailing the Modus Operandi
This question focuses on the operational mechanics: the methods, tools, and procedures used to carry out an action, often referred to as Tactics, Techniques, and Procedures (TTPs).
- **Guiding Question:** How were the actions executed (step-by-step process)?
- **Guiding Question:** What specific tools, software, or hardware were used?
- **Guiding Question:** How was detection avoided or security circumvented?

## Working with Exploratores
- **Every search button sends your query to a third party.** The name, number or address you type goes to the service the button opens, and into your browser history. Use a research browser profile, and think before searching a sensitive identifier on a service you do not know.
- **Some services notify or log.** Services that require a login see which account searched; some social platforms show the subject who viewed a profile. Prefer the passive tools first.
- **A result is a lead, not a finding.** A page that answers a search says nothing yet about who is behind it. Open it, capture it (page, screenshot, date and time in UTC, SHA-256), grade it, and only then use it. Exploratores does not save what you find: run the case on [Argos](https://github.com/SOsintOps/Argos) or [Speculator](https://github.com/SOsintOps/Speculator-Project), which keep evidence folders and report templates.
- **Official registers come first.** In the country pages, a national register kept by law is normally an `A` source; a commercial aggregator copying it is weaker, and its copy may be out of date.
- **Local tools stay local.** The Redactor, the IBAN tool and CyberChef run in your browser and send nothing. Remove personal data with the Redactor before you paste case text into an external AI model, and treat what the model returns as a lead to verify.
- **Search engines and dorks return pointers.** Cite the page they lead to, never the search result.

## Operational Security (OPSEC) Best Practices
Effective OPSEC is not optional. It is a core discipline required to protect yourself, your investigations, and the organisation from exposure and adversarial counter-intelligence. Conduct all activities with the highest ethical standards and in accordance with all applicable laws.
- **Identity Segregation:** Never use personal accounts or equipment for investigative activities. Create and use dedicated, non-attributable online accounts and personas for your work. Do not link these personas to each other or to your real identity.
- **Secure Infrastructure:** Always use a trusted, no-log Virtual Private Network (VPN) to mask your true IP address. For sensitive investigations, conduct your work from within a dedicated Virtual Machine (VM) to sandbox your activities from your host machine. Consider using the Tor Browser for enhanced anonymisation.
- **Sterile Browsing Environment:** Use a dedicated web browser with separate profiles for each digital persona. Install privacy-enhancing extensions (e.g., ad blockers, script blockers, anti-tracking tools). Regularly clear cookies, cache, and history.
- **Disciplined Online Conduct:** Be aware of your digital footprint. Avoid providing unnecessary personal information when registering for services. Use unique, strong passwords and email addresses for each persona. Be cautious about the information you "like," share, or post, as it can be used to profile your persona.
- **Secure Data Handling:** All information collected during an investigation must be stored securely. Use encrypted storage for your case files. Establish a clear data retention and destruction policy to securely delete information that is no longer needed.

## Writing the Report
The report is the product: put the answer first (bottom line up front), keep facts and judgements apart, cite and grade every source, state the gaps. The full guide, with a structure and a checklist, is [Report Writing](field-notes/report-writing.md); report templates ship with [Argos](https://github.com/SOsintOps/Argos) and [Speculator](https://github.com/SOsintOps/Speculator-Project).

## Further Reading
For a more in-depth analysis of the methodologies and practices discussed, the following foundational texts are recommended. The full list is the [Reading List](field-notes/reading-list.md).
- **"Psychology of Intelligence Analysis"** by Richards J. Heuer Jr. (CIA, 1999) - A crucial text for understanding and mitigating the cognitive biases that affect analytical judgement. [PDF](https://www.cia.gov/resources/csi/static/Pyschology-of-Intelligence-Analysis.pdf)
- **"Criminal Intelligence: Manual for Analysts"** by Howard Atkin (UNODC, 2011) - A UNODC reference manual covering the full intelligence process: source evaluation, link analysis, event charting, flow analysis, and telephone analysis. Equips practitioners to develop inferences and present analytical results. [PDF](https://www.unodc.org/documents/organized-crime/Law-Enforcement/Criminal_Intelligence_for_Analysts.pdf)
- **"ICD 203: Analytic Standards"** (ODNI) - The US Intelligence Community Directive behind the standards and the likelihood scale above. [PDF](https://www.dni.gov/files/documents/ICD/ICD-203.pdf)
- **"Structured Analytic Techniques for Intelligence Analysis"** by Randolph H. Pherson and Richards J. Heuer Jr. - A reference manual that presents dozens of structured analytical techniques to improve the rigour and quality of analysis. [SAGE](https://www.sagepub.com/en-us/cab/structured-analytic-techniques-for-intelligence-analysis/book255432)
- **"A Tradecraft Primer: Structured Analytic Techniques for Improving Intelligence Analysis"** (CIA, 2009) - A short, free introduction to the same techniques. [PDF](https://www.cia.gov/resources/csi/static/955180a45afe3f5013772c313b16face/Tradecraft-Primer-apr09.pdf)
- **"Extreme Privacy: What It Takes to Disappear"** by Michael Bazzell - An extensive guide on digital security and maintaining anonymity, which directly supports the OPSEC principles discussed. [IntelTechniques](https://inteltechniques.com/book7.html)
- **"OSINT Techniques"** (11th edition) by Michael Bazzell and Jason Edison - A comprehensive, practical guide to the tools and techniques for gathering information from open sources; earlier editions were titled *Open Source Intelligence Techniques*. [IntelTechniques](https://inteltechniques.com/book1.html)
- **"Deep Dive: Exploring the Real-World Value of Open Source Intelligence"** by Rae L. Baker - Real-world case studies demonstrating the practical application and value of OSINT across various sectors. [Wiley](https://www.wiley.com/en-us/Deep+Dive%3A+Exploring+the+Real+world+Value+of+Open+Source+Intelligence-p-9781119933243)

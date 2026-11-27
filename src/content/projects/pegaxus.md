---
order: 1
title: PEGAXUS
subtitle: Cross-border racehorse transport management system
role: Business Analyst & Developer
status: Course project
year: '2026'
featured: true
problem: Model how a platform could coordinate racehorse transport across Europe and the UK, from booking to billing.
produced: Six business flows, SRS, requirements, business rules, RACI and CRUD matrices, diagrams, prototypes and UI.
result: Produced an SRS and a Markdown repository documenting the proposed workflows.
cardImage:
  src: ../../assets/pegaxus-screen.png
  alt: PEGAXUS transport platform home screen with a horse and navigation for journeys, compliance and platform tools.
useCase:
  id: UC-18
  title: Create Trip Dossier from Template
  question:
    - text: "How can we help staff who prepare the regulatory documentation for international trips spend less time "
    - text: searching legal requirements manually
      highlight: true
    - text: " and reduce the risk of "
    - text: overlooking mandatory documents
      highlight: true
    - text: "?"
  problem: >-
    Selecting every document manually for each route takes time and can leave requirements missing. The dossier must account for the countries involved and for documents that apply to a trip or to each horse.
  approach:
    - >-
      Domain research identified a pattern: required documents largely depend on the countries of departure, destination, and transit. Because these requirements are primarily defined by regulations, they tend to remain relatively stable over time.
    - >-
      This finding led to reusable document requirement templates that Transport Specialists can create and maintain for specific countries and routes. For each trip, PEGAXUS suggests templates based on its origin and destination and generates a document list from the selected template.
    - >-
      The specialist can add requirements for specific trip conditions or remove them when an exemption applies. The generated list remains subject to specialist review; the system does not verify legal compliance automatically.
  steps:
    - title: Select a route-relevant template
      description: >-
        Templates are ranked by how their country-specific requirements match the origin and destination. The strongest match is marked Recommended with an explanation; mismatched templates remain visible with a warning. A custom dossier can also be started without a template.
      visuals:
        - src: ../../assets/projects/pegaxus/uc18-000.png
          continuation: ../../assets/projects/pegaxus/uc18-001.png
          alt: PEGAXUS template selection screen showing an Ireland to United Kingdom booking and a recommended dossier template.
          continuationAlt: Continuation of the same template selection screen showing the remaining template row and preview details.
    - title: Review and customize requirements
      description: >-
        The specialist previews the template's document list, then keeps, removes, modifies, or adds requirements for this trip. Custom requirements can specify whether they apply once per trip or separately to a horse. These changes affect the new dossier, not the source template.
      visuals:
        - src: ../../assets/projects/pegaxus/uc18-002.png
          continuation: ../../assets/projects/pegaxus/uc18-003.png
          alt: PEGAXUS customize dossier requirements screen with summary counts and the three-step progress indicator.
          continuationAlt: Continuation of the same customization screen showing the selected requirements and next action.
        - src: ../../assets/projects/pegaxus/uc18-004.png
          alt: PEGAXUS dialog for adding a custom dossier requirement with scope, mandatory status, lead time, and a generated requirement preview.
    - title: Review the generated dossier
      description: >-
        The final review shows booking details, the selected template, and the generated requirement list. The specification creates one entry for each per-trip requirement and a separate entry for each horse when the requirement is horse-specific. Confirmation creates one Main dossier in Draft status.
      visuals:
        - src: ../../assets/projects/pegaxus/uc18-005.png
          continuation: ../../assets/projects/pegaxus/uc18-006.png
          alt: PEGAXUS review screen summarizing the booking, selected template, and five generated dossier requirements.
          continuationAlt: Continuation of the same review screen showing two Equine Passport entries for two horses and three trip-level documents.
  safeguards:
    - Creation is blocked if the deposit is unpaid, the specialist is not assigned, or the transport request is cancelled.
    - A second Main dossier cannot be created for the same transport request.
    - If the request is cancelled during or after creation, the dossier closes and further edits or customer submissions are disabled.
    - The Draft requirement list is visible to the Transport Specialist, not to customers.
  scopeNote: >-
    This is a course-project use case specification and interface proposal. The system suggests templates; the Transport Specialist remains responsible for checking suitability and legal accuracy.
images:
  - src: ../../assets/projects/pegaxus/context-diagram.png
    alt: PEGAXUS context diagram showing the system's data exchanges with customers, transport staff, management, payment and email services, and external tools.
    caption: Context diagram
    kind: diagram
links:
  - label: Document
    url: https://drive.google.com/file/d/1qkM0BDFrOTfWraSsY3ROiWSIVMizVL7p/view?usp=sharing
---

**Sep 2026 – Present · Course project · Team of 5**

The course project covers transport booking, regulatory checks, route setup, trip tracking, incident handling, handover, compensation and billing.

**My work**

- Defined scope from instructor requirements; researched regulations and real transport workflows to shape business logic.
- Documented six business flows with user personas, functional and non-functional requirements, use cases, business rules, a RACI matrix and a CRUD matrix.
- Modeled state machines, use case diagrams, context diagrams and sequence diagrams for core flows and entities.
- Created and refined wireframes and prototypes, then implemented the user interface.
- Collaborated with teammates on ERD design and API contracts.

**Skills and tools:** requirement analysis, workflow research, requirements documentation, use case modeling, Draw.io, Mermaid, Google Stitch, Git, GitHub, Figma, TaskCoper, Antigravity and Google Workspace MCP.

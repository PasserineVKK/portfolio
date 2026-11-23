---
order: 2
title: EduConnect LMS
subtitle: Attendance and leave management for an English language center
role: Business Analyst
status: Case study
year: '2026'
featured: true
problem: Absences reported through Zalo, counselors, or conversations could be missed by an LMS workflow that relies on formal leave requests.
produced: Contextual observation, requirement gap analysis, solution comparison, activity diagrams, business rules, and an annotated attendance wireframe.
result: Proposed a teacher-controlled correction workflow for recording externally reported absences with a required reason.
heroSummary:
  context: Academic Project
  domain: English Language Center / Education
  focus: Attendance & Leave Management
  primaryUser: Teacher
  activities: Requirement Analysis · Contextual Observation · Gap Analysis · Solution Design · Workflow & Wireframing
caseSections:
  - id: context
    title: Context
    pdfPage: 3
    paragraphs:
      - >-
        The course scenario proposed EduConnect as an integrated LMS for English language centers. Students could submit leave requests, teachers could approve them, and attendance would use the approved requests when class began.
      - >-
        The initial workflow assumed that the formal LMS request was the only channel for legitimate absence information. I mapped the leave-request and attendance paths to make that assumption visible before comparing them with practice.
    visuals: [initial-leave-request, initial-attendance]
  - id: observation
    title: Contextual Observation
    pdfPage: 4
    paragraphs:
      - >-
        I observed attendance practices at an English center I attended and spoke informally with a teacher and a counselor. The focus was how students reported absences, how teachers received that information, and how attendance was recorded.
    bullets:
      - Students often used Zalo, conversations, or counselors instead of a formal LMS request.
      - Teachers still recorded attendance in the management system and could receive relevant information outside it.
      - Excused and unexcused status mattered for attendance-based benefits and contract conditions.
  - id: requirement-gap
    title: Requirement Gap
    pdfPage: 5
    paragraphs:
      - >-
        The proposed requirement treated EduConnect as the complete source of absence information. The observed process used several communication channels. A teacher might know why a student was absent while the LMS had no request to support an excused status.
      - >-
        Centralizing absence reports in the LMS would depend on students consistently adopting the formal process. That was not the behavior I observed.
  - id: problem-definition
    title: Problem Definition
    pdfPage: 5
    paragraphs:
      - >-
        When information received outside the LMS is not captured, a legitimate excused absence can be recorded as unexcused. The design question became: how can EduConnect maintain accurate attendance records when students may report absences through other channels?
  - id: alternative-solutions
    title: Alternative Solutions
    pdfPage: 6
    paragraphs:
      - >-
        I compared two paths. The first requires all absence reports through EduConnect and treats it as the single source of truth. The second keeps the formal request path but lets teachers correct an absence classification when they have valid information from another channel.
      - >-
        The proposed workflow adds that controlled correction to attendance, while preserving the existing student request and teacher approval process.
    visuals: [proposed-leave-request, proposed-attendance]
  - id: analysis-decision
    title: Analysis & Decision
    pdfPage: 7
    paragraphs:
      - >-
        LMS-only reporting would make data easier to centralize and audit, but it relies on student adoption and consistent enforcement. Teacher-controlled correction fits the observed behavior more closely, though it adds manual work and depends on teacher judgment.
      - >-
        I selected teacher-controlled attendance correction for this context. A teacher can change an absent student from unexcused to excused when they have valid information, but must record a reason. The formal leave-request path stays available.
    bullets:
      - No approved request means an absence is initially unexcused.
      - A teacher can correct the classification when another channel provides valid information.
      - Every correction to excused absence requires a reason.
  - id: wireframe-design
    title: Wireframe Design
    pdfPage: 8
    paragraphs:
      - >-
        The attendance screen brings class selection, student status, and a reason field into one teacher workflow. It includes a bulk action for marking a class present and makes the reason mandatory when a teacher changes an absence to excused.
      - >-
        The annotated version shows the intended behavior for bulk attendance, controlled correction, automatic pre-fill from an approved request, and required reasons.
    visuals: [wireframe-base, wireframe-annotated]
  - id: expected-impact
    title: Expected Impact
    pdfPage: 9
    paragraphs:
      - >-
        The proposal is intended to bring externally reported absences into the formal attendance record and reduce incorrect unexcused classifications. It keeps the LMS request path active while allowing teachers to handle exceptions they already encounter.
      - >-
        These are expected effects of a design proposal. The feature was not deployed or measured in this case study.
  - id: reflection
    title: Reflection
    pdfPage: 10
    paragraphs:
      - >-
        This case showed me that a documented requirement can hide assumptions about how people actually work. Observing the center exposed cases the initial LMS workflow did not cover.
      - >-
        I also learned to treat auditability as part of solution design. If a user can change an important record, the interface should make the reason for that change traceable.
  - id: limitation
    title: Limitation
    pdfPage: 10
    paragraphs:
      - >-
        Teachers would still need to verify information scattered across Zalo, conversations, and counselors. The correction workflow does not remove those channels; it provides a controlled way to reflect valid information in the LMS. Its consistency depends on clear rules and teacher judgment.
titleUrl: https://drive.google.com/file/d/1SwCPBVuL7uyQyvmsr8EktXWD9mlgXeIe/view?usp=sharing
links:
  - label: Case Study Report
    url: https://drive.google.com/file/d/1SwCPBVuL7uyQyvmsr8EktXWD9mlgXeIe/view?usp=sharing
images:
  - src: ../../assets/projects/educonnect/attendance-wireframe.jpg
    alt: Annotated EduConnect attendance screen showing class selection, student statuses, correction controls, and required reasons.
    caption: Annotated wireframe for the teacher's attendance workflow, including corrections and a required reason for excused absences.
  - src: ../../assets/projects/educonnect/attendance-workflow.jpg
    alt: Activity diagrams showing the student leave-request flow and the teacher's attendance decisions in EduConnect.
    caption: Proposed leave-request and attendance activity diagrams, including the path for information received outside the LMS.
---

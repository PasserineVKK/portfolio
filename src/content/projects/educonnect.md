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
result: Proposed a teacher-controlled correction workflow that records externally reported absences with a required reason.
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

**Academic case study · 2026 · Business Analyst**

EduConnect began as a course scenario for an integrated LMS at an English language center. This case study focuses on one part of that system: how student leave requests affect attendance records. The course scenario assumed that students would submit leave requests in the LMS, teachers would approve them, and the system would use those requests when recording attendance.

## What I observed

I compared that proposed workflow with practices at an English center I attended. I observed how absences were communicated and discussed the process informally with a teacher and a counselor. Students commonly reported absences through Zalo, verbally, or through counselors. Formal LMS requests existed but were relatively uncommon. Teachers still took attendance in the management system and sometimes had relevant information that the system did not contain.

The gap was therefore in the information entering the attendance record. If the LMS treated an approved request as the only evidence for an excused absence, a student who had already informed a teacher through another channel could be marked unexcused. That distinction mattered because attendance status could affect student benefits and the center's handling of attendance-related contract conditions.

## Options and decision

I compared two approaches. Requiring all reports through EduConnect would centralize data and make reporting simpler, but it depended on students changing their current behavior and the center consistently enforcing that policy. Allowing teachers to correct attendance preserved the formal request process while giving them a way to record valid information received elsewhere.

I selected **teacher-controlled attendance correction** for the observed context. It adds manual work and depends on teacher judgment, so the correction needs a reason that can be reviewed later. The proposal follows three rules:

1. Students can still submit formal leave requests through EduConnect.
2. An absent student without an approved leave request is initially marked unexcused.
3. A teacher can change that status to excused when they have valid information from another channel, and must enter a reason.

## Proposed experience

The activity diagrams show how the formal leave path and the attendance path meet. An approved request can feed the attendance record; when no approved request exists, the teacher can review outside information and correct the status. The annotated wireframe places class selection, attendance statuses, correction controls, and the reason field in one screen. It also shows a bulk action for marking a class present and a pre-filled reason when an approved leave request is available.

## Expected impact and limits

The proposal would bring externally reported absences into the formal record and reduce incorrect unexcused classifications while keeping the existing LMS request path available. These are **expected outcomes of a design proposal**, not measured results from a deployed feature.

Teachers would still need to verify information scattered across Zalo, conversations, and counselors. The proposal does not eliminate those channels; it gives teachers a controlled way to reflect them in attendance data. This case reinforced the need to validate requirements against actual behavior and to make manual changes traceable.

**Methods and tools:** contextual observation, informal elicitation, requirement gap analysis, process modeling, solution comparison, activity diagrams, wireframing, Draw.io, Mermaid, Google Stitch, and Google Workspace.

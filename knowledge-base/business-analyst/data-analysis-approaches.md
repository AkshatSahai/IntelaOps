# Data Analysis Approaches for Business Analysts

## The BA's Relationship with Data

Business analysts use data to validate assumptions, understand current-state performance, build the case for change, and define success metrics. You don't need to be a data scientist — but you must be comfortable reading, questioning, and communicating data.

## Descriptive Analysis — Understanding Current State

### Key Questions
- What is happening in the process today?
- What does the data tell us about volume, frequency, and error rates?
- Where are the outliers?

### Techniques
- **Frequency analysis**: How often does each outcome occur?
- **Trend analysis**: How has performance changed over time?
- **Distribution analysis**: What is the range and spread of values?
- **Pareto analysis (80/20)**: Which 20% of causes account for 80% of the problem?

### Common Sources
Process logs, transaction databases, support ticket systems, CRM data, operational dashboards.

## Root Cause Analysis — Understanding Why

### 5 Whys Technique
Start with the symptom and ask "why" five times (or until you reach a root cause, not a person).

Example:
1. Why are customers calling support? → Their order status isn't visible online
2. Why isn't order status visible? → The order management system doesn't expose a status API
3. Why doesn't it expose a status API? → It was built in 2009 before APIs were standard
4. Why wasn't it updated? → No business case was made for the investment
5. **Root cause**: No one owned the end-to-end customer order experience across systems

### Fishbone (Ishikawa) Diagram
Categorise potential causes under: People, Process, Technology, Environment, Materials, Measurement. Useful for brainstorming root causes in workshops.

## Gap Analysis — From Current to Future State

Structure:

| Dimension | Current State | Future State | Gap | Requirement |
|-----------|---------------|--------------|-----|-------------|
| Process | Manual data entry | Automated import | No API integration | Build import API |
| Data | Siloed by department | Unified data model | No common key | Implement customer ID |

Gaps become requirements. Requirements become the project scope.

## Defining and Measuring Success

### Before you write requirements, define success metrics:
- What KPI will improve?
- By how much?
- In what timeframe?
- How will we measure it?

### SMART Metrics Framework
- **Specific**: "Reduce order processing time" → "Reduce average order processing time from 4 hours to 1 hour"
- **Measurable**: How will you measure it?
- **Achievable**: Is it realistic given constraints?
- **Relevant**: Does it connect to a business objective?
- **Time-bound**: By when?

## Presenting Data to Stakeholders

- Lead with the insight, not the data: "Customers wait 4x longer than they expect" not "The average wait time is 47 minutes"
- Use visuals: a bar chart beats a table; a trend line beats both
- Anticipate "so what?" — every data point should connect to a decision or recommendation
- Acknowledge uncertainty: distinguish between what the data shows and what it implies

## Data Quality Red Flags

Watch for:
- Missing values in unexpected places
- Outliers that seem implausible (is it a data entry error?)
- Inconsistent categorisation (same thing called different names in different records)
- Data that contradicts anecdotal evidence from users (investigate — someone is right)
- Metrics that seem too good — process performance data is often measured at the point of least friction

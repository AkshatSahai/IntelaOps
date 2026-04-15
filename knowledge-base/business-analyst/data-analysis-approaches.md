# Data Analysis Approaches for Business Analysts

## The BA's Role in Data Analysis

Business analysts use data analysis to frame problems, validate assumptions, and support recommendations. Unlike data scientists who build models, BAs need to know how to interpret data, structure analyses that answer decision-relevant questions, and present findings to non-technical stakeholders.

The BA's primary data skill is not statistical sophistication — it is asking the right question before touching a spreadsheet. Most failed analyses fail because they measure the wrong thing, not because the math is wrong.

## Framing Analyses for Decisions

Every analysis should start with a decision: "What decision will this analysis inform?" If no decision is pending, there is no reason to do the analysis.

**Analysis framing template:**
1. **Decision:** What is the specific decision to be made?
2. **Decision-maker:** Who will make the decision, and when?
3. **Key question:** What data question, when answered, will inform that decision?
4. **Hypothesis:** What do we expect to find, and why?
5. **Data needed:** What data sources and variables are required?
6. **Success criteria:** What finding would lead to Decision A vs. Decision B?

Frame the analysis before collecting data. Analysts who collect data first and frame questions second end up with confirmation bias baked in.

## Descriptive Analysis (What Happened?)

Descriptive analysis summarizes historical data to understand current state. It answers: What happened? How much? How often? What does the distribution look like?

**Common techniques:**
- Summary statistics (mean, median, mode, percentiles) — use median for skewed distributions
- Trend analysis (time series, moving averages)
- Cohort analysis (grouping users/customers by a shared characteristic, e.g., signup month)
- Funnel analysis (drop-off rates at each step of a process)

**BA application:** Baseline measurement before a change initiative. Establishing "as-is" metrics for feasibility and ROI calculations.

## Diagnostic Analysis (Why Did It Happen?)

Diagnostic analysis investigates the causes behind a pattern. It answers: Why is this metric moving? What is driving the change?

**Common techniques:**
- Segmentation (break a top-line metric into component groups to find where the change is concentrated)
- Correlation analysis (identify variables that move together — correlation is not causation)
- Root cause analysis (5 Whys, fishbone diagram applied to data)
- Pareto analysis (identify the 20% of causes driving 80% of the effect)

**BA application:** Root cause identification for process improvement. Supporting a business case by understanding why a current metric is underperforming.

## Avoiding Vanity Metrics

Vanity metrics look impressive but don't inform decisions. They obscure problems rather than surface them.

**Vanity metric examples:**
- Total registered users (vs. active users)
- Page views (vs. conversion rate)
- Features shipped (vs. customer outcomes improved)
- Emails sent (vs. emails acted upon)

**Actionable metric characteristics:**
1. **Comparative:** Has a benchmark (prior period, target, industry standard)
2. **Rate or ratio:** Percentage or rate, not raw count — adjusts for volume changes
3. **Decision-relevant:** A change in this metric would cause a specific action
4. **Leading indicator:** Predicts future outcomes, not just records past ones

When reviewing a proposed dashboard or report, ask for each metric: "If this number goes up, what would we do differently?" If the answer is "nothing," it is a vanity metric.

## Categorization Taxonomies

When analyzing qualitative data (customer feedback, support tickets, requirements, interview notes), a categorization taxonomy turns unstructured text into structured counts.

**Building a taxonomy:**
1. Sample 20–30 items from the dataset
2. Note recurring themes — these become your top-level categories
3. Break each category into 2–4 sub-categories
4. Apply the taxonomy to the full dataset
5. Add an "Other" category with a threshold — if "Other" exceeds 10% of items, the taxonomy has gaps

**Taxonomy design principles:**
- Mutually exclusive: each item belongs to exactly one category
- Collectively exhaustive: every item can be categorized (with the "Other" escape)
- Consistent naming: avoid overlapping terms between categories

**BA application:** Categorizing support ticket themes to prioritize features. Classifying requirements by business domain. Analyzing stakeholder feedback themes.

## Presenting Data Findings

Data analysis is only valuable if the audience understands and acts on it. Structure findings presentations as:

1. **Bottom line up front (BLUF):** State the conclusion in one sentence before showing any data
2. **Supporting evidence:** Show the 2–3 data points that most directly support the conclusion
3. **Caveats:** State the limitations of the analysis explicitly — what data was unavailable, what assumptions were made
4. **Recommended action:** Tie findings back to the original decision. What should the decision-maker do based on this?

Avoid data dumps. A slide with 15 charts is not an analysis — it is raw data. The BA's job is to synthesize, not present.

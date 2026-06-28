import type {
  PredictionResult,
  ManualPredictionFormData,
  TalentInsightsData,
} from "@/types/prediction";

// Comprehensive dataset configuration based on user specifications
const DATASET_FIELDS = [
  // Basic Information
  {
    name: "year",
    type: "number",
    description: "Year of observation",
    section: "Personal Information",
    min: 2000,
    max: 2026,
    required: true,
  },
  {
    name: "age",
    type: "number",
    description: "Age in years",
    section: "Personal Information",
    min: 18,
    max: 75,
    required: true,
  },
  {
    name: "gender",
    type: "categorical",
    description: "Gender",
    section: "Personal Information",
    options: ["Male", "Female", "Other"],
    required: true,
  },
  {
    name: "marital_status",
    type: "categorical",
    description: "Marital Status",
    section: "Personal Information",
    options: ["Single", "Married", "Divorced", "Widowed"],
    required: false,
  },
  {
    name: "children_count",
    type: "number",
    description: "Number of Children",
    section: "Personal Information",
    min: 0,
    max: 10,
    required: false,
  },
  // Location
  {
    name: "district",
    type: "categorical",
    description: "Current District",
    section: "Personal Information",
    options: [
      "Kathmandu",
      "Bhaktapur",
      "Lalitpur",
      "Pokhara",
      "Dharan",
      "Biratnagar",
      "Janakpur",
      "Nepalgunj",
      "Birgunj",
      "Hetauda",
      "Other",
    ],
    required: true,
  },
  {
    name: "province",
    type: "categorical",
    description: "Province",
    section: "Personal Information",
    options: [
      "Bagmati",
      "Gandaki",
      "Lumbini",
      "Koshi",
      "Madhesh",
      "Sudurpashchim",
      "Karnali",
    ],
    required: false,
  },
  {
    name: "rural_urban",
    type: "categorical",
    description: "Rural or Urban Area",
    section: "Personal Information",
    options: ["Rural", "Urban", "Semi-urban"],
    required: false,
  },
  // Education
  {
    name: "education_level",
    type: "categorical",
    description: "Highest Education Level",
    section: "Education",
    options: ["High School", "Bachelor", "Master", "PhD", "Diploma"],
    required: true,
  },
  {
    name: "field_of_study",
    type: "categorical",
    description: "Field of Study",
    section: "Education",
    options: [
      "IT",
      "Healthcare",
      "Finance",
      "Engineering",
      "Education",
      "Business",
      "Agriculture",
      "Law",
      "Other",
    ],
    required: false,
  },
  {
    name: "university_type",
    type: "categorical",
    description: "University Type",
    section: "Education",
    options: ["Public", "Private", "International"],
    required: false,
  },
  {
    name: "ielts_score",
    type: "number",
    description: "IELTS Score (if available)",
    section: "Education",
    min: 0,
    max: 9,
    required: false,
  },
  {
    name: "has_foreign_degree",
    type: "boolean",
    description: "Has Foreign Degree",
    section: "Education",
    required: false,
  },
  // Employment
  {
    name: "occupation",
    type: "categorical",
    description: "Current Occupation",
    section: "Employment",
    options: [
      "Software Engineer",
      "Healthcare Professional",
      "Finance Professional",
      "Civil Engineer",
      "Teacher",
      "Business Owner",
      "Accountant",
      "Other",
    ],
    required: false,
  },
  {
    name: "sector",
    type: "categorical",
    description: "Employment Sector",
    section: "Employment",
    options: [
      "IT",
      "Healthcare",
      "Finance",
      "Engineering",
      "Education",
      "Manufacturing",
      "Services",
      "Government",
      "Other",
    ],
    required: true,
  },
  {
    name: "employment_status",
    type: "categorical",
    description: "Employment Status",
    section: "Employment",
    options: ["Employed", "Unemployed", "Self-employed", "Student", "Retired"],
    required: true,
  },
  {
    name: "monthly_income_npr",
    type: "number",
    description: "Monthly Income (NPR)",
    section: "Employment",
    min: 0,
    max: 5000000,
    required: false,
  },
  {
    name: "years_of_experience",
    type: "number",
    description: "Years of Experience",
    section: "Employment",
    min: 0,
    max: 60,
    required: true,
  },
  {
    name: "job_satisfaction",
    type: "number",
    description: "Job Satisfaction (1-10)",
    section: "Employment",
    min: 1,
    max: 10,
    required: false,
  },
  {
    name: "local_job_availability",
    type: "number",
    description: "Local Job Availability (1-10)",
    section: "Employment",
    min: 1,
    max: 10,
    required: false,
  },
  // Migration Information
  {
    name: "applied_visa",
    type: "boolean",
    description: "Applied for Visa",
    section: "Migration History",
    required: false,
  },
  {
    name: "family_abroad",
    type: "number",
    description: "Number of Family Members Abroad",
    section: "Migration History",
    min: 0,
    max: 20,
    required: false,
  },
  {
    name: "target_country",
    type: "categorical",
    description: "Target Destination Country",
    section: "Migration History",
    options: [
      "USA",
      "UK",
      "Canada",
      "Australia",
      "UAE",
      "Qatar",
      "Saudi Arabia",
      "Malaysia",
      "Singapore",
      "Other",
    ],
    required: false,
  },
  {
    name: "years_planning_to_leave",
    type: "number",
    description: "Years Planning to Leave (if applicable)",
    section: "Migration History",
    min: 0,
    max: 10,
    required: false,
  },
  // Economic Factors
  {
    name: "salary_satisfaction",
    type: "number",
    description: "Salary Satisfaction (1-10)",
    section: "Economic Indicators",
    min: 1,
    max: 10,
    required: false,
  },
  {
    name: "political_stability_perception",
    type: "number",
    description: "Political Stability Perception (1-10)",
    section: "Economic Indicators",
    min: 1,
    max: 10,
    required: false,
  },
  {
    name: "cost_of_living_burden",
    type: "number",
    description: "Cost of Living Burden (1-10)",
    section: "Economic Indicators",
    min: 1,
    max: 10,
    required: false,
  },
  {
    name: "career_growth_perception",
    type: "number",
    description: "Career Growth Perception (1-10)",
    section: "Economic Indicators",
    min: 1,
    max: 10,
    required: false,
  },
  // Financial Indicators
  {
    name: "monthly_income_npr_clean",
    type: "number",
    description: "Clean Monthly Income (NPR)",
    section: "Financial Information",
    min: 0,
    max: 5000000,
    required: false,
  },
  {
    name: "annual_tax_contribution_npr",
    type: "number",
    description: "Annual Tax Contribution (NPR)",
    section: "Financial Information",
    min: 0,
    max: 100000000,
    required: false,
  },
  {
    name: "productivity_index",
    type: "number",
    description: "Productivity Index",
    section: "Financial Information",
    min: 0,
    max: 100,
    required: false,
  },
  {
    name: "remittance_dependency",
    type: "number",
    description: "Remittance Dependency (%)",
    section: "Financial Information",
    min: 0,
    max: 100,
    required: false,
  },
  {
    name: "remittance_amount_usd",
    type: "number",
    description: "Remittance Amount (USD)",
    section: "Financial Information",
    min: 0,
    max: 1000000,
    required: false,
  },
  {
    name: "gdp_contribution_usd",
    type: "number",
    description: "GDP Contribution (USD)",
    section: "Financial Information",
    min: 0,
    max: 1000000,
    required: false,
  },
  {
    name: "fiscal_risk_exposure",
    type: "number",
    description: "Fiscal Risk Exposure (1-10)",
    section: "Financial Information",
    min: 1,
    max: 10,
    required: false,
  },
  // Sector Indicators
  {
    name: "unemployment_pressure",
    type: "number",
    description: "Unemployment Pressure in Sector (%)",
    section: "Sector Statistics",
    min: 0,
    max: 100,
    required: false,
  },
  {
    name: "sector_graduation_rate",
    type: "number",
    description: "Sector Graduation Rate (%)",
    section: "Sector Statistics",
    min: 0,
    max: 100,
    required: false,
  },
  {
    name: "sector_retirement_rate",
    type: "number",
    description: "Sector Retirement Rate (%)",
    section: "Sector Statistics",
    min: 0,
    max: 100,
    required: false,
  },
  {
    name: "sector_growth_rate",
    type: "number",
    description: "Sector Growth Rate (%)",
    section: "Sector Statistics",
    min: -50,
    max: 50,
    required: false,
  },
  {
    name: "sector_local_openings",
    type: "number",
    description: "Sector Local Openings (per 1000)",
    section: "Sector Statistics",
    min: 0,
    max: 1000,
    required: false,
  },
  {
    name: "salary_increase_pct",
    type: "number",
    description: "Salary Increase Percentage",
    section: "Sector Statistics",
    min: -50,
    max: 100,
    required: false,
  },
  // Government / Investment
  {
    name: "education_investment_npr",
    type: "number",
    description: "Education Investment (NPR)",
    section: "Government Indicators",
    min: 0,
    max: 100000000,
    required: false,
  },
  {
    name: "tax_incentive_returnee_pct",
    type: "number",
    description: "Tax Incentive for Returnees (%)",
    section: "Government Indicators",
    min: 0,
    max: 100,
    required: false,
  },
  // Persona
  {
    name: "persona",
    type: "categorical",
    description: "User Persona Type",
    section: "Persona",
    options: [
      "Student",
      "Early Career",
      "Mid Career",
      "Senior Professional",
      "Entrepreneur",
      "Other",
    ],
    required: false,
  },
];

export class PredictionService {
  /**
   * Get dataset fields configuration
   */
  static getDatasetFields() {
    return DATASET_FIELDS;
  }

  /**
   * Make a single brain drain prediction
   */
  static async predictBrainDrain(
    data: ManualPredictionFormData,
  ): Promise<PredictionResult> {
    const startTime = performance.now();

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(
        () => {
          const result = this.generateMockPrediction(data);
          const endTime = performance.now();
          result.processingTime = Math.round(endTime - startTime);
          resolve(result);
        },
        1500 + Math.random() * 500,
      ); // 1.5-2 seconds
    });
  }

  /**
   * Make batch predictions for CSV data
   */
  static async predictBatch(
    data: ManualPredictionFormData[],
    onProgress: (processed: number, total: number) => void,
    signal?: AbortSignal,
  ) {
    const results: { rowIndex: number; prediction: PredictionResult }[] = [];

    for (let i = 0; i < data.length; i++) {
      if (signal?.aborted) break;

      const result = await this.predictBrainDrain(data[i]);
      results.push({ rowIndex: i, prediction: result });

      onProgress(i + 1, data.length);

      // Add small delay between predictions to avoid blocking
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    return results;
  }

  /**
   * Generate mock prediction based on input data
   */
  private static generateMockPrediction(
    data: ManualPredictionFormData,
  ): PredictionResult {
    // Calculate risk factors
    let riskScore = 0;
    let factorWeights: { [key: string]: number } = {};

    // Age factor (optimal: 25-35)
    const age = (data.age as number) || 30;
    const ageFactor = age < 25 || age > 45 ? 0.7 : age > 35 ? 0.5 : 0.3;
    riskScore += ageFactor * 15;
    factorWeights["Age"] = ageFactor * 15;

    // Education factor (higher education = higher risk)
    const education = data.education_level as string;
    const educationFactor =
      education === "PhD"
        ? 0.8
        : education === "Master"
          ? 0.6
          : education === "Bachelor"
            ? 0.4
            : 0.2;
    riskScore += educationFactor * 15;
    factorWeights["Education Level"] = educationFactor * 15;

    // Foreign experience
    const hasForeignExp = data.has_foreign_experience ? 0.7 : 0.2;
    riskScore += hasForeignExp * 12;
    factorWeights["Foreign Experience"] = hasForeignExp * 12;

    // Family members abroad
    const familyAbroad = (data.family_members_abroad as number) || 0;
    const familyFactor = Math.min(familyAbroad * 0.08, 0.8);
    riskScore += familyFactor * 12;
    factorWeights["Family Abroad"] = familyFactor * 12;

    // Job satisfaction
    const satisfaction = (data.current_job_satisfaction as number) || 5;
    const satisfactionFactor = (10 - satisfaction) / 10;
    riskScore += satisfactionFactor * 14;
    factorWeights["Job Satisfaction"] = satisfactionFactor * 14;

    // Career growth perception
    const growthOpp = (data.career_growth_opportunities as number) || 5;
    const growthFactor = (10 - growthOpp) / 10;
    riskScore += growthFactor * 14;
    factorWeights["Career Growth"] = growthFactor * 14;

    // Interested in abroad
    const interested = data.interested_in_abroad ? 0.6 : 0.2;
    riskScore += interested * 15;
    factorWeights["Interest in Abroad"] = interested * 15;

    // Political stability perception
    const stability = (data.political_stability_perception as number) || 5;
    const stabilityFactor = (10 - stability) / 10;
    riskScore += stabilityFactor * 10;
    factorWeights["Political Stability"] = stabilityFactor * 10;

    // Normalize risk score
    const normalizedRisk = Math.min(riskScore, 100);

    // Calculate migration probability
    const migrationProb = normalizedRisk / 100;

    // Determine status
    let status: "high_risk" | "medium_risk" | "low_risk";
    if (migrationProb >= 0.65) status = "high_risk";
    else if (migrationProb >= 0.4) status = "medium_risk";
    else status = "low_risk";

    // Confidence varies based on data completeness
    const confidence = 0.75 + Math.random() * 0.2;

    // Top factors
    const topFactors = Object.entries(factorWeights)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, importance]) => ({
        name,
        importance: Math.round(importance),
      }));

    return {
      migrationProbability: Math.round(migrationProb * 100),
      riskScore: Math.round(normalizedRisk),
      confidenceScore: Math.round(confidence * 100),
      status,
      topFactors,
      prediction: {
        summary: this.generateSummary(migrationProb, status, age, education),
        aiExplanation: this.generateAIExplanation(topFactors, status),
        governmentActions: this.generateGovernmentActions(status),
        companyActions: this.generateCompanyActions(data),
        personalActions: this.generatePersonalActions(status),
      },
      featureContribution: factorWeights,
      processingTime: 0, // Set by caller
    };
  }

  private static generateSummary(
    prob: number,
    status: string,
    age: number,
    education: string,
  ): string {
    const probPercentage = Math.round(prob * 100);
    if (status === "high_risk") {
      return `High migration risk detected (${probPercentage}%). Individual shows strong indicators for potential brain drain with ${education} education and age ${age}. Immediate retention strategies recommended.`;
    } else if (status === "medium_risk") {
      return `Moderate migration risk identified (${probPercentage}%). Individual at age ${age} with ${education} education demonstrates mixed migration signals. Targeted support may help retention.`;
    } else {
      return `Low migration risk assessed (${probPercentage}%). Individual appears committed to staying with current conditions. Continued support will maintain retention.`;
    }
  }

  private static generateAIExplanation(
    factors: { name: string; importance: number }[],
    status: string,
  ): string {
    const topThree = factors
      .slice(0, 3)
      .map((f) => f.name)
      .join(", ");
    return `The prediction model identified ${topThree} as the most influential factors contributing to the migration risk assessment. The ${status.replace("_", " ")} classification is primarily driven by these factors combined with socioeconomic and personal development indicators.`;
  }

  private static generateGovernmentActions(status: string): string[] {
    if (status === "high_risk") {
      return [
        "Establish specialized retention programs for high-risk talent",
        "Create competitive scholarship programs for advanced education",
        "Improve political stability and governance transparency",
        "Develop high-paying government positions in strategic sectors",
      ];
    } else if (status === "medium_risk") {
      return [
        "Enhance career development opportunities",
        "Improve infrastructure and service quality",
        "Create innovation hubs and startup support",
        "Strengthen social safety nets",
      ];
    } else {
      return [
        "Maintain current stability policies",
        "Continue investment in education and employment",
        "Build on successful retention initiatives",
        "Strengthen community development programs",
      ];
    }
  }

  private static generateCompanyActions(
    data: ManualPredictionFormData,
  ): string[] {
    const satisfaction = (data.current_job_satisfaction as number) || 5;
    const growth = (data.career_growth_opportunities as number) || 5;

    const actions: string[] = [];

    if (satisfaction < 5)
      actions.push("Review and improve workplace environment");
    if (growth < 5) actions.push("Create clear career progression pathways");
    actions.push("Offer competitive compensation and benefits");
    actions.push("Provide professional development opportunities");

    if ((data.tech_skill_level as string) !== "Expert") {
      actions.push("Invest in employee training and upskilling");
    }

    return actions.slice(0, 5);
  }

  private static generatePersonalActions(status: string): string[] {
    if (status === "high_risk") {
      return [
        "Evaluate your career goals and long-term vision",
        "Explore skill development opportunities in target areas",
        "Research available opportunities both locally and internationally",
        "Build a strong professional network",
        "Consider higher education or specialization",
      ];
    } else if (status === "medium_risk") {
      return [
        "Assess personal career satisfaction and growth",
        "Continue skill development and learning",
        "Evaluate financial stability and savings goals",
        "Strengthen work-life balance",
        "Consider mentorship and networking opportunities",
      ];
    } else {
      return [
        "Maintain current skill development trajectory",
        "Contribute to community and professional growth",
        "Mentor junior professionals",
        "Explore advancement opportunities locally",
        "Consider thought leadership and industry participation",
      ];
    }
  }
}

/**
 * Hook for getting talent intelligence data
 */
export function getTalentIntelligenceData(): TalentInsightsData {
  return {
    nationalOverview: {
      totalTalent: 125400,
      atRiskCount: 45320,
      highDemandSkills: [
        "Python",
        "Data Science",
        "Cloud Computing",
        "AI/ML",
        "DevOps",
      ],
      avgEducationYears: 14.2,
    },
    districtDistribution: {
      Kathmandu: 32500,
      Pokhara: 18200,
      Biratnagar: 12300,
      Dharan: 10400,
      Bhaktapur: 8900,
      Lalitpur: 22100,
      Other: 21000,
    },
    educationDistribution: {
      "High School": 25400,
      Bachelor: 62300,
      Master: 28900,
      PhD: 8800,
    },
    professionDistribution: {
      "Software Engineering": 35200,
      Healthcare: 22100,
      Finance: 18900,
      Education: 16400,
      Engineering: 19300,
      Other: 13500,
    },
    migrationRiskSegmentation: {
      highRisk: 18128,
      mediumRisk: 27192,
      lowRisk: 80080,
    },
    skillGapAnalysis: [
      { skill: "Data Science", demand: 95, supply: 45 },
      { skill: "Cloud Architecture", demand: 90, supply: 40 },
      { skill: "AI/Machine Learning", demand: 88, supply: 35 },
      { skill: "DevOps", demand: 85, supply: 50 },
      { skill: "Frontend Development", demand: 75, supply: 65 },
      { skill: "Backend Development", demand: 80, supply: 70 },
      { skill: "Project Management", demand: 60, supply: 55 },
    ],
    employmentInsights: {
      Employed: 95200,
      Unemployed: 15400,
      SelfEmployed: 8900,
      Student: 5900,
    },
    migrationTrends: [
      { month: "Jan", migratedCount: 1250, atRiskCount: 4500 },
      { month: "Feb", migratedCount: 1350, atRiskCount: 4620 },
      { month: "Mar", migratedCount: 1450, atRiskCount: 4800 },
      { month: "Apr", migratedCount: 1500, atRiskCount: 5100 },
      { month: "May", migratedCount: 1650, atRiskCount: 5400 },
      { month: "Jun", migratedCount: 1850, atRiskCount: 5800 },
      { month: "Jul", migratedCount: 2050, atRiskCount: 6200 },
      { month: "Aug", migratedCount: 1950, atRiskCount: 6000 },
      { month: "Sep", migratedCount: 1850, atRiskCount: 5800 },
      { month: "Oct", migratedCount: 1750, atRiskCount: 5500 },
      { month: "Nov", migratedCount: 1650, atRiskCount: 5200 },
      { month: "Dec", migratedCount: 1550, atRiskCount: 4900 },
    ],
    governmentOpportunities: [
      { type: "Tax Incentives", count: 15, impact: "High" },
      { type: "Visa Programs", count: 8, impact: "Very High" },
      { type: "Startup Grants", count: 23, impact: "High" },
      { type: "Education Scholarships", count: 45, impact: "Medium" },
    ],
    futureForecasts: [
      { year: 2024, projectedMigration: 18000, skillDemand: 92 },
      { year: 2025, projectedMigration: 21000, skillDemand: 96 },
      { year: 2026, projectedMigration: 24500, skillDemand: 101 },
      { year: 2027, projectedMigration: 28000, skillDemand: 107 },
    ],
    policyRecommendations: [
      "Establish dedicated brain drain task force with inter-ministry coordination",
      "Create competitive salary standards indexed to international markets",
      "Implement flexible work-from-abroad programs for diaspora engagement",
      "Fast-track visa and immigration processes for returning professionals",
      "Build innovation hubs and research centers to attract returning talent",
      "Offer tax holidays and startup incentives for entrepreneurial talent",
    ],
  };
}

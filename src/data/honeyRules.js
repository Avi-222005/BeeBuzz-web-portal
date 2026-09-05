// Master Honey Quality Rules & FSSAI / BIS Standards for BeeBuzz (HoneyTrace)
export const honeySmartRules = [
  {
    floralSource: "Mustard Blossom Raw Honey",
    key: "mustard",
    botanicalName: "Brassica juncea / Brassica napus",
    commonName: "Mustard Blossom Raw Honey (Sarson Honey)",
    approvedRegions: "Punjab, Haryana, Rajasthan, Uttar Pradesh (Aligarh / Bharatpur Belt)",
    harvestSeason: "Winter (December - February)",
    naturalColor: "Light Amber / Creamy White when Crystallized",
    fssaiStandards: {
      moistureLimit: "≤ 20.0% w/w",
      hmfLimit: "≤ 80.0 mg/kg",
      sucroseLimit: "≤ 5.0% w/w",
      fgRatio: "≥ 0.95",
      c4SugarIRMS: "Negative (< 7% - Adulteration Free)",
      pollenDominance: "> 85% Brassica pollen grains",
      antibiotics: "Not Detected (ND)",
      diastaseActivity: "≥ 8 Schade Units"
    },
    labParameters: [
      { id: "moisture", test: "Moisture Content (Refractometer / LOD)", limit: "≤ 20.0% w/w", defaultValue: "17.4", unit: "% w/w", method: "AOAC 969.38", threshold: 20.0, type: "max" },
      { id: "hmf", test: "Hydroxymethylfurfural (HMF)", limit: "≤ 80.0 mg/kg", defaultValue: "24.6", unit: "mg/kg", method: "HPLC-UV (Winkler)", threshold: 80.0, type: "max" },
      { id: "sucrose", test: "Apparent Sucrose", limit: "≤ 5.0% w/w", defaultValue: "2.1", unit: "% w/w", method: "AOAC 920.180", threshold: 5.0, type: "max" },
      { id: "fg_ratio", test: "Fructose / Glucose Ratio (F/G)", limit: "≥ 0.95", defaultValue: "1.12", unit: "ratio", method: "HPLC-RI", threshold: 0.95, type: "min" },
      { id: "c4_sugar", test: "C4 Sugar Adulteration (SIRA / IRMS)", limit: "Negative (< 7%)", defaultValue: "Negative (Pass)", unit: "qualitative", method: "EA-IRMS", threshold: "Negative", type: "match" },
      { id: "pollen", test: "Melissopalynological Pollen Origin", limit: "> 85% Specific Pollen", defaultValue: "91.4% Brassica Juncea", unit: "% pollen count", method: "Microscopic Count", threshold: 85.0, type: "min" },
      { id: "antibiotics", test: "Antibiotic Residues (Streptomycin/Tetracycline)", limit: "Not Detected (ND)", defaultValue: "Not Detected (ND)", unit: "qualitative", method: "LC-MS/MS", threshold: "ND", type: "match" },
      { id: "heavy_metals", test: "Heavy Metals (Lead)", limit: "≤ 2.5 ppm", defaultValue: "0.12", unit: "ppm", method: "ICP-MS", threshold: 2.5, type: "max" }
    ]
  },
  {
    floralSource: "Eucalyptus Raw Forest Honey",
    key: "eucalyptus",
    botanicalName: "Eucalyptus tereticornis",
    commonName: "Eucalyptus Raw Forest Honey (Safeda Honey)",
    approvedRegions: "Uttar Pradesh (Terai), Punjab, Haryana",
    harvestSeason: "Spring (February - April)",
    naturalColor: "Medium Amber / Woody Tint",
    fssaiStandards: {
      moistureLimit: "≤ 20.0% w/w",
      hmfLimit: "≤ 80.0 mg/kg",
      sucroseLimit: "≤ 5.0% w/w",
      fgRatio: "≥ 1.00",
      c4SugarIRMS: "Negative (< 7%)",
      pollenDominance: "> 80% Eucalyptus pollen",
      antibiotics: "Not Detected (ND)",
      diastaseActivity: "≥ 8 Schade Units"
    },
    labParameters: [
      { id: "moisture", test: "Moisture Content", limit: "≤ 20.0% w/w", defaultValue: "18.1", unit: "% w/w", method: "AOAC 969.38", threshold: 20.0, type: "max" },
      { id: "hmf", test: "Hydroxymethylfurfural (HMF)", limit: "≤ 80.0 mg/kg", defaultValue: "18.2", unit: "mg/kg", method: "HPLC-UV", threshold: 80.0, type: "max" },
      { id: "sucrose", test: "Sucrose Content", limit: "≤ 5.0% w/w", defaultValue: "1.8", unit: "% w/w", method: "AOAC 920.180", threshold: 5.0, type: "max" },
      { id: "fg_ratio", test: "F/G Ratio", limit: "≥ 0.95", defaultValue: "1.04", unit: "ratio", method: "HPLC-RI", threshold: 0.95, type: "min" },
      { id: "c4_sugar", test: "C4 Sugar Adulteration (IRMS)", limit: "Negative", defaultValue: "Negative (Pass)", unit: "qualitative", method: "EA-IRMS", threshold: "Negative", type: "match" },
      { id: "pollen", test: "Pollen Analysis", limit: "> 80% Eucalyptus", defaultValue: "86.2% Eucalyptus", unit: "% pollen count", method: "Microscopic", threshold: 80.0, type: "min" },
      { id: "antibiotics", test: "Antibiotics", limit: "ND", defaultValue: "Not Detected (ND)", unit: "qualitative", method: "LC-MS/MS", threshold: "ND", type: "match" }
    ]
  },
  {
    floralSource: "Muzaffarpur Golden Lychee Honey",
    key: "lychee",
    botanicalName: "Litchi chinensis",
    commonName: "Muzaffarpur Golden Lychee Raw Honey",
    approvedRegions: "Bihar (Muzaffarpur), Uttarakhand (Dehradun / Ramnagar)",
    harvestSeason: "Spring Bloom (March - April)",
    naturalColor: "Light Golden / Aromatic Floral",
    fssaiStandards: {
      moistureLimit: "≤ 20.0% w/w",
      hmfLimit: "≤ 80.0 mg/kg",
      sucroseLimit: "≤ 5.0% w/w",
      fgRatio: "≥ 1.05",
      c4SugarIRMS: "Negative (< 7%)",
      pollenDominance: "> 85% Litchi pollen",
      antibiotics: "Not Detected (ND)"
    },
    labParameters: [
      { id: "moisture", test: "Moisture Content", limit: "≤ 20.0% w/w", defaultValue: "18.6", unit: "% w/w", method: "AOAC 969.38", threshold: 20.0, type: "max" },
      { id: "hmf", test: "Hydroxymethylfurfural (HMF)", limit: "≤ 80.0 mg/kg", defaultValue: "14.5", unit: "mg/kg", method: "HPLC-UV", threshold: 80.0, type: "max" },
      { id: "sucrose", test: "Sucrose Content", limit: "≤ 5.0% w/w", defaultValue: "2.4", unit: "% w/w", method: "AOAC 920.180", threshold: 5.0, type: "max" },
      { id: "fg_ratio", test: "F/G Ratio", limit: "≥ 0.95", defaultValue: "1.18", unit: "ratio", method: "HPLC-RI", threshold: 0.95, type: "min" },
      { id: "c4_sugar", test: "C4 Sugar Adulteration (IRMS)", limit: "Negative", defaultValue: "Negative (Pass)", unit: "qualitative", method: "EA-IRMS", threshold: "Negative", type: "match" },
      { id: "pollen", test: "Pollen Analysis", limit: "> 85% Litchi", defaultValue: "89.1% Litchi", unit: "% pollen count", method: "Microscopic", threshold: 85.0, type: "min" },
      { id: "antibiotics", test: "Antibiotics", limit: "ND", defaultValue: "Not Detected (ND)", unit: "qualitative", method: "LC-MS/MS", threshold: "ND", type: "match" }
    ]
  },
  {
    floralSource: "Sundarbans Wild Forest Raw Honey",
    key: "multifloral",
    botanicalName: "Mangrove Wild Nectar Flora (Avicennia / Aegiceras)",
    commonName: "Sundarbans Wild Forest Raw Honey",
    approvedRegions: "Sundarbans (West Bengal), Western Ghats, Nilgiris",
    harvestSeason: "Post-Monsoon (September - November)",
    naturalColor: "Dark Amber / Rich Mineral Complex",
    fssaiStandards: {
      moistureLimit: "≤ 20.0% w/w",
      hmfLimit: "≤ 80.0 mg/kg",
      sucroseLimit: "≤ 5.0% w/w",
      fgRatio: "≥ 0.98",
      c4SugarIRMS: "Negative (< 7%)",
      antibiotics: "Not Detected (ND)"
    },
    labParameters: [
      { id: "moisture", test: "Moisture Content", limit: "≤ 20.0% w/w", defaultValue: "19.2", unit: "% w/w", method: "AOAC 969.38", threshold: 20.0, type: "max" },
      { id: "hmf", test: "Hydroxymethylfurfural (HMF)", limit: "≤ 80.0 mg/kg", defaultValue: "28.4", unit: "mg/kg", method: "HPLC-UV", threshold: 80.0, type: "max" },
      { id: "sucrose", test: "Sucrose Content", limit: "≤ 5.0% w/w", defaultValue: "1.9", unit: "% w/w", method: "AOAC 920.180", threshold: 5.0, type: "max" },
      { id: "fg_ratio", test: "F/G Ratio", limit: "≥ 0.95", defaultValue: "1.08", unit: "ratio", method: "HPLC-RI", threshold: 0.95, type: "min" },
      { id: "c4_sugar", test: "C4 Sugar Adulteration (IRMS)", limit: "Negative", defaultValue: "Negative (Pass)", unit: "qualitative", method: "EA-IRMS", threshold: "Negative", type: "match" },
      { id: "pollen", test: "Pollen Analysis", limit: "Multifloral Mangrove", defaultValue: "Wild Mangrove Complex", unit: "% pollen count", method: "Microscopic", threshold: 80.0, type: "min" },
      { id: "antibiotics", test: "Antibiotics", limit: "ND", defaultValue: "Not Detected (ND)", unit: "qualitative", method: "LC-MS/MS", threshold: "ND", type: "match" }
    ]
  },
  {
    floralSource: "Kashmir White Acacia Honey",
    key: "acacia",
    botanicalName: "Robinia pseudoacacia",
    commonName: "Kashmir Valley White Acacia Honey",
    approvedRegions: "Kashmir Valley, Kishtwar, Himachal Pradesh",
    harvestSeason: "Late Spring (May - June)",
    naturalColor: "Water White to Extra Light Amber",
    fssaiStandards: {
      moistureLimit: "≤ 19.0% w/w",
      hmfLimit: "≤ 40.0 mg/kg",
      sucroseLimit: "≤ 5.0% w/w",
      fgRatio: "≥ 1.20",
      c4SugarIRMS: "Negative",
      antibiotics: "Not Detected (ND)"
    },
    labParameters: [
      { id: "moisture", test: "Moisture Content", limit: "≤ 19.0% w/w", defaultValue: "16.8", unit: "% w/w", method: "AOAC 969.38", threshold: 19.0, type: "max" },
      { id: "hmf", test: "Hydroxymethylfurfural (HMF)", limit: "≤ 40.0 mg/kg", defaultValue: "11.2", unit: "mg/kg", method: "HPLC-UV", threshold: 40.0, type: "max" },
      { id: "sucrose", test: "Sucrose Content", limit: "≤ 5.0% w/w", defaultValue: "1.5", unit: "% w/w", method: "AOAC 920.180", threshold: 5.0, type: "max" },
      { id: "fg_ratio", test: "F/G Ratio", limit: "≥ 1.10", defaultValue: "1.32", unit: "ratio", method: "HPLC-RI", threshold: 1.10, type: "min" },
      { id: "c4_sugar", test: "C4 Sugar Adulteration (IRMS)", limit: "Negative", defaultValue: "Negative (Pass)", unit: "qualitative", method: "EA-IRMS", threshold: "Negative", type: "match" },
      { id: "pollen", test: "Pollen Analysis", limit: "> 75% Robinia", defaultValue: "84.5% Robinia", unit: "% pollen count", method: "Microscopic", threshold: 75.0, type: "min" },
      { id: "antibiotics", test: "Antibiotics", limit: "ND", defaultValue: "Not Detected (ND)", unit: "qualitative", method: "LC-MS/MS", threshold: "ND", type: "match" }
    ]
  }
];

export const migratoryCorridors = [
  {
    corridorId: "CORR-NORTH-01",
    name: "North Indian Mustard-Eucalyptus-Apple Migratory Corridor",
    flow: "Punjab (Mustard Bloom - Nov/Jan) ➔ Haryana (Beri - Feb) ➔ UP (Eucalyptus/Litchi - Mar/Apr) ➔ Himachal/J&K (Apple/Acacia - May/Jun)",
    states: ["Punjab", "Haryana", "Uttar Pradesh", "Himachal Pradesh", "Jammu & Kashmir"]
  },
  {
    corridorId: "CORR-EAST-02",
    name: "Eastern Plains to Sundarbans Mangrove Corridor",
    flow: "Bihar (Muzaffarpur Litchi - Mar/Apr) ➔ West Bengal (Sundarbans Mangrove - May/Jul) ➔ Jharkhand (Karanj - Oct/Dec)",
    states: ["Bihar", "West Bengal", "Jharkhand"]
  }
];

export const kvicHoneyMissionGuidelines = {
  schemeName: "KVIC Honey Mission (National Honey Board)",
  boxAllocationStandard: 10,
  estimatedYieldPerBoxPerYear: "35 - 45 kg",
  trainingDuration: "5-day intensive scientific beekeeping certification",
  subsidyPercentage: "80% government grant on bee boxes, colonies and extraction kits"
};

export const getHoneyRule = (floralSourceOrKey = '') => {
  if (!floralSourceOrKey) return honeySmartRules[0];
  const query = String(floralSourceOrKey).toLowerCase();
  const matched = honeySmartRules.find(r => 
    r.key.toLowerCase() === query ||
    r.floralSource.toLowerCase().includes(query) ||
    r.commonName.toLowerCase().includes(query) ||
    query.includes(r.key.toLowerCase())
  );
  return matched || honeySmartRules[0];
};

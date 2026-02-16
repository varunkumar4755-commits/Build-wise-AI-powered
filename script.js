// Get form element safely after DOM loads
const form = document.getElementById('projectForm');

form.addEventListener('submit', function(e){
  e.preventDefault();

  // ✅ FIX: Read values from inputs using getElementById
  const typeEl = document.getElementById('type');
  const areaEl = document.getElementById('area');
  const locationEl = document.getElementById('location');
  const budgetEl = document.getElementById('budget');

  const type = typeEl.value.toLowerCase();
  const area = parseFloat(areaEl.value);
  const location = locationEl.value.toLowerCase();
  const budget = parseFloat(budgetEl.value);

  if(!type || !area || !location || !budget){
    alert('Please fill all inputs');
    return;
  }

  // ===== Advanced Estimation Model (More Accurate & Detailed) =====

  // Base construction rate by project type (₹ per sq ft)
  let baseRate = 1900; // Residential standard
  if(type === 'commercial') baseRate = 2700;
  if(type === 'industrial') baseRate = 2300;

  // Location adjustment
  let locationFactor = location === 'urban' ? 1.18 : 0.95;

  // Final rate
  const rate = baseRate * locationFactor;

  // Cost components
  const materialCost = area * rate * 0.50;
  const laborCost = area * rate * 0.35;
  const equipmentCost = area * rate * 0.15;
  const contingency = area * rate * 0.08; // risk buffer

  const totalCost = materialCost + laborCost + equipmentCost + contingency;

  // ===== COST OUTPUT (Detailed) =====
  document.getElementById('outCost').textContent =
`Rate: ₹${Math.round(rate)}/sq ft
Material Cost (50%): ₹${Math.round(materialCost).toLocaleString()}
Labor Cost (35%): ₹${Math.round(laborCost).toLocaleString()}
Equipment Cost (15%): ₹${Math.round(equipmentCost).toLocaleString()}
Contingency: ₹${Math.round(contingency).toLocaleString()}
TOTAL PROJECT COST: ₹${Math.round(totalCost).toLocaleString()}`;

  // ===== RESOURCE PLANNING =====
  const engineers = Math.max(1, Math.ceil(area / 4000));
  const supervisors = Math.max(1, Math.ceil(area / 6000));
  const skilledWorkers = Math.ceil(area / 120);
  const helpers = Math.ceil(skilledWorkers * 0.6);

  document.getElementById('outResources').textContent =
`Project Engineers: ${engineers}
Site Supervisors: ${supervisors}
Skilled Workers: ${skilledWorkers}
Helper Labor: ${helpers}
Major Equipment: Concrete mixers, cranes, scaffolding`;

  // ===== SCHEDULE GENERATION =====
  const planningMonths = Math.max(1, Math.ceil(area / 5000));
  const constructionMonths = Math.ceil(area / 900);
  const finishingMonths = Math.max(1, Math.ceil(area / 4000));
  const totalMonths = planningMonths + constructionMonths + finishingMonths;

  document.getElementById('outSchedule').textContent =
`Planning & Approvals: ${planningMonths} months
Core Construction: ${constructionMonths} months
Finishing & Inspection: ${finishingMonths} months
TOTAL DURATION: ${totalMonths} months`;

  // ===== BLUEPRINT INSIGHTS =====
  let blueprintText = '';
  if(area > 5000) blueprintText = 'Recommended: Multi‑storey RCC framed structure with seismic design.';
  else if(area > 2000) blueprintText = 'Recommended: Medium-rise RCC structure with efficient column spacing.';
  else blueprintText = 'Recommended: Low-rise load-bearing or framed structure.';

  blueprintText += `
Include proper ventilation, fire safety exits, and drainage planning.`;

  document.getElementById('outBlueprint').textContent = blueprintText;

  // ===== PROJECT OPTIMIZATION =====
  let optimization = '';

  if(totalCost > budget){
    optimization = '⚠ Project exceeds budget. Consider value engineering, alternate materials, or phased construction.';
  } else {
    optimization = '✓ Project within budget. Allocate reserve funds for risks and quality improvements.';
  }

  optimization += `
Cost-saving tips: Bulk material procurement, optimized design, local sourcing.`;
  optimization += `
Schedule optimization: Parallel task execution and prefabrication methods.`;

  document.getElementById('outOptimization').textContent = optimization;

  // Show results section
  document.getElementById('results').style.display = 'block';
});

// Reveal animation
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry,i)=>{
    if(entry.isIntersecting){
      setTimeout(()=>entry.target.classList.add('show'), i*120);
    }
  });
},{threshold:.2});

document.querySelectorAll('.result-card').forEach(card=>observer.observe(card));

// Dark/Light toggle
const toggleBtn = document.getElementById('modeToggle');
toggleBtn.onclick = () => {
  document.body.classList.toggle('light');
  toggleBtn.textContent = document.body.classList.contains('light') ? '☀ Light' : '🌙 Dark';
};

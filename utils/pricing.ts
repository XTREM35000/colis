interface PriceCalculationParams {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  insurance?: {
    covered: boolean;
    value: number;
  };
}

export function calculatePrice(params: PriceCalculationParams): number {
  const { weight, dimensions, insurance } = params;
  
  // Prix de base selon le poids
  let basePrice = weight * 10;
  
  // Volume en cm³
  const volume = dimensions.length * dimensions.width * dimensions.height;
  
  // Ajout du prix selon le volume
  basePrice += volume * 0.001;
  
  // Ajout de l'assurance si applicable
  if (insurance?.covered) {
    basePrice += (insurance.value || 0) * 0.01;
  }
  
  return Math.round(basePrice * 100) / 100;
}
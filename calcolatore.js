const queryString = new URLSearchParams(window.location.search);
const code = queryString.get("code");

fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
.then(response => response.json())
.then(data => {
  const imageUrl = data.product.image_url;
  const productName = data.product.product_name;
  const nutritionFacts = data.product.nutriments;
  const sugarPerPortion = nutritionFacts.sugars_per_portion;
  const sugarPerPortionDivided = sugarPerPortion / 4; // Dividi per 4
  const gramsPerPortion = nutritionFacts.serving_quantity; // Grammi per porzione

  const productImage = document.createElement('img');
  productImage.onload = () => {
    // L'immagine è stata caricata correttamente
    document.getElementById("product-image").src = imageUrl;
  }
  productImage.onerror = () => {
    // Errore durante il caricamento dell'immagine
    console.error("Impossibile caricare l'immagine del prodotto");
  }
  productImage.src = imageUrl;
  document.body.appendChild(productImage);

  // Mostra solo le informazioni sugli zuccheri
  document.getElementById("product-name").innerHTML = productName;
  document.getElementById("cucchiaini").innerHTML = `Contiene ${sugarPerPortionDivided} cucchiai di zucchero per una porzione.`;
  document.getElementById("grammi-per-porzione").innerHTML = `Una porzione di prodotto equivale a ${gramsPerPortion} grammi`;
})
.catch(error => console.error(error));

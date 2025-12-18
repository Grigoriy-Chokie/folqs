document.addEventListener('DOMContentLoaded', function () {
const navEntry = performance.getEntriesByType('navigation')[0];
if (navEntry && navEntry.type === 'back_forward') {
    window.location.reload();
}

const products = document.querySelectorAll('.landing-product');

products.forEach((product) => {

  if(product.dataset.redirectTo) {
    window.location.href = product.dataset.redirectTo
    return
  }

  const klaviyoData = JSON.parse(product.querySelector('.landing-product-klaviyo-data')?.innerHTML || '{}');

  if (klaviyoData.companyId && klaviyoData.productItem && !getCookie('is_metric_recorded')) {
    setCookie('is_metric_recorded', 'true', 1);
    klaviyo.push(["track", "Viewed Product", klaviyoData.productItem]);
    klaviyo.push(["trackViewedItem", {
      "Title": klaviyoData.productItem.ProductName,
      "ItemId": klaviyoData.productItem.ProductID,
      "ImageUrl": klaviyoData.productItem.ImageURL,
      "Url": klaviyoData.productItem.URL,
      "Metadata": {
        "Brand": klaviyoData.productItem.Brand,
        "Price": klaviyoData.productItem.Price,
      }
    }]);
  }
})


  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function setCookie(name, value, days) {
    let expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
  }

  let radioInputs = document.querySelectorAll('input[type="radio"]');

  radioInputs.forEach(function (input) {
    if (input.classList.contains('product-information__radio--one-time-quantity') && input.checked) {
      let currentQuantityPackWrapper = input.closest('.product-information__selling-plan-wrapper');
      if(!currentQuantityPackWrapper) return
      currentQuantityPackWrapper.classList.add('active');
      const currentProductForm = input.closest('.landing-product__container')?.querySelector('product-form');
      currentProductForm._discountCode = input.dataset.discountCode || null;
    }
  })

  radioInputs.forEach(function (input) {
    function handleChange() {
      if (this.classList.contains('product-information__radio--one-time-quantity')) {
        radioInputs.forEach(function (otherInput) {
          if (otherInput !== input) {
            let otherQuantityPackWrapper = otherInput.closest('.product-information__selling-plan-wrapper');
            if(!otherQuantityPackWrapper) return
            otherQuantityPackWrapper.classList.remove('active');
            otherInput.checked = false;
          } else {
            let currentQuantityPackWrapper = input.closest('.product-information__selling-plan-wrapper');
            if(!currentQuantityPackWrapper) return
            currentQuantityPackWrapper.classList.add('active');
            input.checked = true;

            const currentProductForm = input.closest('.landing-product__container')?.querySelector('product-form');
            currentProductForm._discountCode = input.dataset.discountCode || null;
          }
        });

        return;
      }

      if (this.checked) {
        let sellingPlanValue = this.value;
        let productFormId = this.getAttribute('form');
        let sellingPlanInput = document.querySelector('input[name*="selling_plan"][form="' + productFormId + '"]');
        let sellingPlanWrapper = this.closest('.product-information__selling-plan-wrapper');
        if(!sellingPlanWrapper) sellingPlanWrapper = this.closest('.sticky-add-cart__option')
        sellingPlanInput.value = sellingPlanValue 
        sellingPlanWrapper.classList.add('active');
        let isOneTimePurchase = sellingPlanWrapper.classList.contains('product-information__selling-plan-wrapper--one-time-purchase');

        let advantagesList = document.querySelector('.product-information__advantages-wrapper' + (isOneTimePurchase ? ':not(.product-information__advantages-wrapper--one-time-purchase)' : '--one-time-purchase'));
        let advantagesListLeft = document.querySelector('.product-information__advantages-wrapper' + (!isOneTimePurchase ? ':not(.product-information__advantages-wrapper--one-time-purchase)' : '--one-time-purchase'));

        if (advantagesList && advantagesListLeft) {
          advantagesList.style.display = "none";
          advantagesListLeft.style.display = "flex";
        }

        radioInputs.forEach(function (otherInput) {
          const currentProduct = input.closest('.landing-product__item');
          if (!currentProduct?.contains(otherInput)) return;

          if (otherInput !== input) {
            let otherSellingPlanWrapper = otherInput.closest('.product-information__selling-plan-wrapper');
            if(!otherSellingPlanWrapper) return
            otherSellingPlanWrapper.classList.remove('active');
            otherInput.checked = false;
          }

          otherInput.closest('.product-information__selling-plan-wrapper')?.querySelector('[name="quantity"]')?.toggleAttribute('disabled', otherInput !== input)
        });
      }
    }

    input.addEventListener('change', handleChange);
    input.addEventListener('click', handleChange);
  });
}, {once: true});
document.addEventListener('DOMContentLoaded', function () {
  let form = document.querySelector('#create_customer');
  let sendEmailsCheckbox = document.getElementById('sendEmails');
  let submitButton = document.querySelector('.customer__submit-button');

  // Initial state check
  toggleSubmitButton();

  // Listen for changes on the checkbox
  sendEmailsCheckbox.addEventListener('change', toggleSubmitButton);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let email = form.querySelector('#RegisterForm-email')?.value;
    toggleErrorInputs(form);
    if (sendEmailsCheckbox.checked && email && klaviyoSettings.listId && klaviyoSettings.companyId) {
      let data = {
        data: {
          type: "subscription",
          attributes: {
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email
                }
              }
            }
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: klaviyoSettings.listId
              }
            }
          }
        }
      };

      fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${klaviyoSettings.companyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Revision': '2024-10-15'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.text())
      .then(form.submit())
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  });

  // Function to toggle the submit button
  function toggleSubmitButton() {
    if (sendEmailsCheckbox.checked) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
  }

  function toggleErrorInputs(form) {
    const requiredFields = form?.querySelectorAll('[aria-required="true"]');
    if (!requiredFields) return;

    requiredFields.forEach(field => {
      field.classList.toggle('input--with-error', field.value === '')
    })
  }
});

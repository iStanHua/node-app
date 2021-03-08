// app/inquirer.js

import inquirer from 'inquirer'

export default {
  run() {
    const questions = [
      {
        type: 'confirm',
        name: 'toBeDelivered',
        message: 'Is this for delivery?',
        default: false,
      },
      {
        type: 'input',
        name: 'phone',
        message: "What's your phone number?",
        validate: function (value) {
          var pass = value.match(
            /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
          );
          if (pass) {
            return true;
          }

          return 'Please enter a valid phone number';
        },
      },
      {
        type: 'password',
        message: 'Enter a masked password',
        name: 'password',
        mask: '*',
        validate: (value) => {
          if (/\w/.test(value) && /\d/.test(value)) return true
          return 'Password need to have at least a letter and a number'
        },
      },
      {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Large', 'Medium', 'Small'],
        filter: function (val) {
          return val.toLowerCase();
        },
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number,
      },
      {
        type: 'expand',
        name: 'toppings',
        message: 'What about the toppings?',
        choices: [
          {
            key: 'p',
            name: 'Pepperoni and cheese',
            value: 'PepperoniCheese',
          },
          {
            key: 'a',
            name: 'All dressed',
            value: 'alldressed',
          },
          {
            key: 'w',
            name: 'Hawaiian',
            value: 'hawaiian',
          },
        ],
      },
      {
        type: 'rawlist',
        name: 'beverage',
        message: 'You also get a free 2L beverage',
        choices: ['Pepsi', '7up', 'Coke'],
      },
      {
        type: 'checkbox',
        message: 'Select toppings',
        name: 'toppings',
        choices: [
          new inquirer.Separator(' = The Meats = '),
          {
            name: 'Pepperoni',
          },
          {
            name: 'Ham',
          },
          {
            name: 'Ground Meat',
          },
          {
            name: 'Bacon',
          },
          new inquirer.Separator(' = The Cheeses = '),
          {
            name: 'Mozzarella',
            checked: true,
          },
          {
            name: 'Cheddar',
          },
          {
            name: 'Parmesan',
          },
          new inquirer.Separator(' = The usual ='),
          {
            name: 'Mushroom',
          },
          {
            name: 'Tomato',
          },
          new inquirer.Separator(' = The extras = '),
          {
            name: 'Pineapple',
          },
          {
            name: 'Olives',
            disabled: 'out of stock',
          },
          {
            name: 'Extra cheese',
          }, {
            type: 'editor',
            name: 'bio',
            message: 'Please write a short bio of at least 3 lines.',
            validate: function (text) {
              if (text.split('\n').length < 3) {
                return 'Must be at least 3 lines.';
              }

              return true;
            },
          },
        ],
        validate: function (answer) {
          if (answer.length < 1) {
            return 'You must choose at least one topping.';
          }

          return true;
        },
      },
      {
        type: 'editor',
        name: 'bio',
        message: 'Please write a short bio of at least 3 lines.',
        validate: function (text) {
          if (text.split('\n').length < 3) {
            return 'Must be at least 3 lines.';
          }

          return true;
        },
      },
    ]

    inquirer.prompt(questions).then(answers => {
      // Use user feedback for... whatever!!
      console.log(answers)
    }).catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  }
}
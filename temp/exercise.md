# coding exercise for annotation tasks

https://app.dataannotation.tech/me

## notes

https://cheerio.js.org/docs/intro
https://stackoverflow.com/questions/78832288/how-can-i-parse-the-data-from-a-table-on-a-google-docs-using-python

$('table').rows.length
row[0] is always the header
$('table').rows[1].cells[0].innerText

const cell_x = 0
const cell_y = 2
const cell_char = 1

```javascript
// Iterate over each row in the table
table.find('tr').each((i, row) => {
    // Skip the header row
    if (i === 0) return;

    // Extract data from each cell
    const rowData = {};
    $(row).find('td').each((j, cell) => {
        if (j === 0) rowData.name = $(cell).text();
        if (j === 1) rowData.age = $(cell).text();
        if (j === 2) rowData.city = $(cell).text();
    });

    // Add the row data to the array
    data.push(rowData);
});

// Output the parsed data
console.log(data);
```



```html
<table class="c1">
  <tbody>
    <tr class="c3">
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">x-coordinate</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">Character</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">y-coordinate</span></p>
      </td>
    </tr>
    <tr class="c3">
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">0</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">█</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">0</span></p>
      </td>
    </tr>
    <tr class="c3">
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">0</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">█</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">1</span></p>
      </td>
    </tr>
    <tr class="c3">
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">0</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">█</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">2</span></p>
      </td>
    </tr>
    <tr class="c3">
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">1</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">▀</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">1</span></p>
      </td>
    </tr>
    <tr class="c3">
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">1</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">▀</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">2</span></p>
      </td>
    </tr>
    <tr class="c3">
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">2</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">▀</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">1</span></p>
      </td>
    </tr>
    <tr class="c3">
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">2</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">▀</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">2</span></p>
      </td>
    </tr>
    <tr class="c3">
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">3</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">▀</span></p>
      </td>
      <td class="c0" colspan="1" rowspan="1">
        <p class="c2"><span class="c4">2</span></p>
      </td>
    </tr>
  </tbody>
</table>
```

## google apis ???

https://github.com/googleapis/google-api-nodejs-client/blob/main/samples/docs/get.js

  const res = await docs.documents.get({
    documentId: '1XPbMENiP5bWP_cbqc0bEWbq78vmUf-rWQ6aB6FVZJyc',
  });

  const res = await docs.documents.get({
    documentId: '2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq',
  });


Looked promising, but needs authentication even to read a public document (AFAICT).

TODO: look into the APIs for other purposes....



## Coding Exercise: Decoding a Secret Message

In this exercise, you will write code to solve a problem. Your code must be in either Python or JavaScript—solutions in other languages will not be accepted! You can write your code using any IDE you want.

Problem
https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub

You are given a Google Doc like this one that contains a list of Unicode characters and their positions in a 2D grid. Your task is to write a function that takes in the URL for such a Google Doc as an argument, retrieves and parses the data in the document, and prints the grid of characters. When printed in a fixed-width font, the characters in the grid will form a graphic showing a sequence of uppercase letters, which is the secret message.

The document specifies the Unicode characters in the grid, along with the x- and y-coordinates of each character.

The minimum possible value of these coordinates is 0. There is no maximum possible value, so the grid can be arbitrarily large.

Any positions in the grid that do not have a specified character should be filled with a space character.

You can assume the document will always have the same format as the example document linked above.

For example, the simplified example document linked above draws out the letter 'F':

█▀▀▀
█▀▀ 
█   
Note that the coordinates (0, 0) will always correspond to the same corner of the grid as in this example, so make sure to understand in which directions the x- and y-coordinates increase.

Specifications
Your code must be written in Python (preferred) or JavaScript.

You may use external libraries.

You may write helper functions, but there should be one function that:

1. Takes in one argument, which is a string containing the URL for the Google Doc with the input data, AND

2. When called, prints the grid of characters specified by the input data, displaying a graphic of correctly oriented uppercase letters.

Please submit the complete code for your function:

1

Explain how your code works in 2-3+ complete sentences.

To verify that your code works, please run your function with this URL as its argument:

https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub

What is the secret message encoded by this document? Your answer should only contain uppercase letters.
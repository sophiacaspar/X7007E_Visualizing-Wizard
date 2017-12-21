var squishCSS = `
<pre>
<code>
.responsive {
    margin: 1em 0;
    background: white;
    color: black;
    border-radius: .4em;
    border: 1px solid black;
}

.responsive tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.responsive td {
    padding-left: .3em;
}

.responsive td:first-child {
    padding-top: .5em;
    padding-left: .3em;
}

.responsive td:last-child {
    padding-bottom: .5em;
}

.responsive th, .responsive td {
  text-align: left;
}

@media (min-width: 480px) {
    .responsive th, .responsive td {
        display: table-cell;
        padding: .25em .5em;
    }
    .responsive th:first-child, .responsive td:first-child {
        padding-left: .2em;
    }
    .responsive th:last-child, .responsive td:last-child {
        padding-right: 0;
    }
}

.responsive tr:nth-child(even) {
    background-color: #dddddd;
}

.responsive th, .responsive td {
  margin: .5em 1em;
}

@media (min-width: 480px) {
  .responsive th, .responsive td {
    padding: 1em !important;
  }
}
</code>
</pre>
`;


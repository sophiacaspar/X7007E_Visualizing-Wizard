var squishCSS = `
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
`;

var squishJS = `
// Generated by CoffeeScript 1.6.3
/*
 *
 *  jQuery ResponsiveTables by Gary Hepting - https://github.com/ghepting/jquery-responsive-tables
 *  
 *  Open source under the MIT License. 
 *
 *  Copyright © 2013 Gary Hepting. All rights reserved.
*/

  $(document).ready(function() {
    $('table.responsive').responsiveTables();
  });

(function() {
  var ResponsiveTable, delayedAdjust, responsiveTableIndex;

  delayedAdjust = [];

  responsiveTableIndex = 0;

  ResponsiveTable = (function() {
    function ResponsiveTable(el) {
      this.index = responsiveTableIndex++;
      this.el = el;
      this.compression = $(this.el).data('compression') || 5;
      this.minFontSize = $(this.el).data('min') || 10;
      this.maxFontSize = $(this.el).data('max') || Number.POSITIVE_INFINITY;
      this.width = $(this.el).data('width') || "100%";
      this.height = $(this.el).data('height') || "auto";
      this.adjustParents = $(this.el).data('adjust-parents') || true;
      this.styled = $(this.el).data('styled') || true;
      this.columns = $('tbody tr', $(this.el)).first().find('th, td').length;
      this.rows = $('tbody tr', $(this.el)).length;
      this.init();
    }

    ResponsiveTable.prototype.init = function() {
      this.setupTable();
      this.adjustOnLoad();
      return this.adjustOnResize();
    };

    ResponsiveTable.prototype.fontSize = function() {
      var compressed;
      if (this.height === "auto") {
        compressed = $('tbody td', $(this.el)).first().width() / this.compression;
      } else {
        compressed = $(this.el).height() / this.rows / this.compression;
      }
      return Math.min(this.maxFontSize, Math.max(compressed, this.minFontSize));
    };

    ResponsiveTable.prototype.setupTable = function() {
      $(this.el).css('width', this.width);
      if (this.height !== "auto") {
        $(this.el).css('height', this.height);
      }
      $("th, td", $(this.el)).css('width', (100 / this.columns) + "%");
      if (this.styled) {
        $(this.el).addClass("responsiveTable");
      }
      if (this.height !== "auto") {
        $("th, td", $(this.el)).css('height', (100 / this.rows) + "%");
        if (this.adjustParents) {
          $(this.el).parents().each(function() {
            return $(this).css('height', '100%');
          });
        }
      }
      return $(this.el).css('font-size', this.fontSize());
    };

    ResponsiveTable.prototype.resizeTable = function() {
      return $(this.el).css('font-size', this.minFontSize).css('font-size', this.fontSize());
    };

    ResponsiveTable.prototype.adjustOnLoad = function() {
      var _this = this;
      return $(window).on('load', function() {
        return _this.resizeTable();
      });
    };

    ResponsiveTable.prototype.adjustOnResize = function() {
      var _this = this;
      return $(window).on('resize', function() {
        clearTimeout(delayedAdjust[_this.index]);
        return delayedAdjust[_this.index] = setTimeout(function() {
          return _this.resizeTable();
        }, 20);
      });
    };

    return ResponsiveTable;

  })();

  (function($) {
    var responsiveTableElements;
    responsiveTableElements = [];
    return $.fn.responsiveTables = function(options) {
      return this.each(function() {
        return responsiveTableElements.push(new ResponsiveTable(this));
      });
    };
  })(jQuery);

}).call(this);
`;

var squishHTML = `
<table class="responsive" data-compression="6" data-min="8" data-max="16" cellpadding=".1em" cellspacing=".2em">
  <tr>
      <th>Heading 1</th>
      <th>Heading 2</th>
      <th>Heading 3</th>
      <th>Heading 4</th>
      <th>Heading 5</th>
  </tr>
  <tr>
    <td>Row 1, Col 1</td>
    <td>Row 1, Col 2</td>
    <td>Row 1, Col 3</td>
    <td>Row 1, Col 4</td>
    <td>Row 1, Col 5</td>
  </tr>
  <tr>
    <td>Row 2, Col 1</td>
    <td>Row 2, Col 2</td>
    <td>Row 2, Col 3</td>
    <td>Row 2, Col 4</td>
    <td>Row 2, Col 5</td>
  </tr>
  <tr>
    <td>Row 3, Col 1</td>
    <td>Row 3, Col 2</td>
    <td>Row 3, Col 3</td>
    <td>Row 3, Col 4</td>
    <td>Row 3, Col 5</td>
  </tr>
  <tr>
    <td>Row 4, Col 1</td>
    <td>Row 4, Col 2</td>
    <td>Row 4, Col 3</td>
    <td>Row 4, Col 4</td>
    <td>Row 4, Col 5</td>
  </tr>
  <tr>
    <td>Row 5, Col 1</td>
    <td>Row 5, Col 2</td>
    <td>Row 5, Col 3</td>
    <td>Row 5, Col 4</td>
    <td>Row 5, Col 5</td>
  </tr>
</table>
        `;

var scrollCSS = `
/* https://codepen.io/paulobrien/pen/gWoVzN */

.table-scroll {
    position:relative;
    margin:auto;
    overflow:hidden;
    border:1px solid #000;
}

@media (min-width: 1000px) {
  .table-scroll {
    width: fit-content;
  }
  .table-scroll table {
    width: fit-content;
  }
}

.table-wrap {
    width:100%;
    overflow:auto;
}
.table-scroll table {
    width: 100%;
    margin:auto;
    border-collapse:separate;
    border-spacing:0;
}

.table-scroll th, .table-scroll td {
    padding:.8em .8em;
    border: 1px solid black;
    background:white;
    white-space:nowrap;
    vertical-align:top;
}
.table-scroll td:nth-child(even), .table-scroll th:nth-child(even) {
  background: #dddddd;
}

.clone {
    position:absolute;
    top:0;
    left:0;
    pointer-events:none;
    width: 5px;
}
.clone th, .clone td {
    visibility:hidden
}
.clone td, .clone th {
    border-color:transparent
}
.clone tbody th {
    visibility:visible;
    color:black;
}
.clone .fixed-side {
    border:1px solid #000;
    background:white;
    visibility:visible;
}
.clone thead {
    background:transparent;
}

col {
    width: 5px;
}

`;

var scrollJS = `
jQuery(document).ready(function() {
   jQuery(".main-table").clone(true).appendTo('#table-scroll').addClass('clone');   
 });
`;

var scrollHTML = `
<div id="table-scroll" class="table-scroll">
    <div class="table-wrap">
        <table class="main-table">
        <thead>
            <tr>
                <th class="fixed-side" scope="col">Heading 1</th>
                <th scope="col">Heading 2</th>
                <th scope="col">Heading 3</th>
                <th scope="col">Heading 4</th>
                <th scope="col">Heading 5</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="fixed-side" >Row 1, Col 1</td>
                <td>Row 1, Col 2</td>
                <td>Row 1, Col 3</td>
                <td>Row 1, Col 4</td>
                <td>Row 1, Col 5</td>
            </tr>
            <tr>
                <td class="fixed-side" >Row 2, Col 1</td>
                <td>Row 2, Col 2</td>
                <td>Row 2, Col 3</td>
                <td>Row 2, Col 4</td>
                <td>Row 2, Col 5</td>
            </tr>
            <tr>
                <td class="fixed-side" >Row 3, Col 1</td>
                <td>Row 3, Col 2</td>
                <td>Row 3, Col 3</td>
                <td>Row 3, Col 4</td>
                <td>Row 3, Col 5</td>
            </tr>
            <tr>
                <td class="fixed-side" >Row 4, Col 1</td>
                <td>Row 4, Col 2</td>
                <td>Row 4, Col 3</td>
                <td>Row 4, Col 4</td>
                <td>Row 4, Col 5</td>
            </tr>
            <tr>
                <td class="fixed-side" >Row 5, Col 1</td>
                <td>Row 5, Col 2</td>
                <td>Row 5, Col 3</td>
                <td>Row 5, Col 4</td>
                <td>Row 5, Col 5</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
`;

var clickCSS = `
.tablesaw {
  background-color: white;
  border-radius: .4em;
}

.tablesaw tr:nth-child(odd) {
    background-color: #dddddd;
}

.tablesaw th {
    background-color: white;
}
`;

var clickJS = `
  /*! Tablesaw - v3.0.3 - 2017-07-13
  * https://github.com/filamentgroup/tablesaw
  * Copyright (c) 2017 Filament Group; Licensed MIT */
`;

var clickHTML = `
<table class="tablesaw tablesaw-swipe" data-tablesaw-mode="swipe" data-tablesaw-minimap>
    <thead>
        <tr>
            <th class="title tablesaw-swipe-cellpersist" scope="col" data-tablesaw-priority="persist">Heading 1</th>
            <th scope="col" class>Heading 2</th>
            <th scope="col" class=" tablesaw-swipe-cellhidden">Heading 3</th>
            <th scope="col" class=" tablesaw-swipe-cellhidden">Heading 4</th>
            <th scope="col" class=" tablesaw-swipe-cellhidden">Heading 5</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="title tablesaw-swipe-cellpersist">Row 1, Col 1</td>
            <td class>Row 1, Col 2</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 1, Col 3</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 1, Col 4</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 1, Col 5</td>
        </tr>
        <tr>
            <td class="title tablesaw-swipe-cellpersist">Row 2, Col 1</td>
            <td class>Row 2, Col 2</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 2, Col 3</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 2, Col 4</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 2, Col 5</td>
        </tr>
        <tr>
            <td class="title tablesaw-swipe-cellpersist">Row 3, Col 1</td>
            <td class>Row 3, Col 2</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 3, Col 3</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 3, Col 4</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 3, Col 5</td>
        </tr>
        <tr>
            <td class="title tablesaw-swipe-cellpersist">Row 4, Col 1</td>
            <td class>Row 4, Col 2</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 4, Col 3</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 4, Col 4</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 4, Col 5</td>
        </tr>
        <tr>
            <td class="title tablesaw-swipe-cellpersist">Row 5, Col 1</td>
            <td class>Row 5, Col 2</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 5, Col 3</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 5, Col 4</td>
            <td scope="col" class=" tablesaw-swipe-cellhidden">Row 5, Col 5</td>
        </tr>
    </tbody>
</table>
                `;


var rowCollapseCSS = `
/* https://codepen.io/geoffyuen/pen/FCBEg */


.rwd-table {
  margin: 1em 0;
  width: 100%;
  background: white;
  color: black;
  border-radius: .4em;
  overflow: hidden;
  border: 1px solid black;

}
.rwd-table tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-color: #46637f;
}
.rwd-table th {
  display: none;
}
.rwd-table td {
  display: block;
}
.rwd-table td:first-child {
  padding-top: .5em;
}
.rwd-table td:last-child {
  padding-bottom: .5em;
}
.rwd-table td:before {
  content: attr(data-th) ": ";
  font-weight: bold;
  width: 9em;
  display: inline-block;
}
@media (min-width: 680px) {
  .rwd-table td:before {
    display: none;
  }
}
.rwd-table th, .rwd-table td {
  text-align: left;
}
@media (min-width: 680px) {
  .rwd-table th, .rwd-table td {
    display: table-cell;
    padding: .25em .5em;
  }
  .rwd-table th:first-child, .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child, .rwd-table td:last-child {
    padding-right: 0;
  }
}

.rwd-table tr:nth-child(even) {
    background-color: #dddddd;
}

.rwd-table th, .rwd-table td {
  margin: .5em 1em;
}
@media (min-width: 680px) {
  .rwd-table th, .rwd-table td {
    padding: 1em !important;
  }
}
.rwd-table th, .rwd-table td:before {
  color: black;
  margin-right: .7em;
}
`;

var rowCollapseHTML = `
<table class="rwd-table">
    <tr>
        <th>Heading 1</th>
        <th>Heading 2</th>
        <th>Heading 3</th>
        <th>Heading 4</th>
        <th>Heading 5</th>
    </tr>
    <tr>
        <td data-th="Heading 1">Row 1, Col 1</td>
        <td data-th="Heading 2">Row 1, Col 2</td>
        <td data-th="Heading 3">Row 1, Col 3</td>
        <td data-th="Heading 4">Row 1, Col 4</td>
        <td data-th="Heading 5">Row 1, Col 5</td>
    </tr>
    <tr>
        <td data-th="Heading 1">Row 2, Col 1</td>
        <td data-th="Heading 2">Row 2, Col 2</td>
        <td data-th="Heading 3">Row 2, Col 3</td>
        <td data-th="Heading 4">Row 2, Col 4</td>
        <td data-th="Heading 5">Row 2, Col 5</td>
    </tr>
    <tr>
        <td data-th="Heading 1">Row 3, Col 1</td>
        <td data-th="Heading 2">Row 3, Col 2</td>
        <td data-th="Heading 3">Row 3, Col 3</td>
        <td data-th="Heading 4">Row 3, Col 4</td>
        <td data-th="Heading 5">Row 3, Col 5</td>
    </tr>
    <tr>
        <td data-th="Heading 1">Row 4, Col 1</td>
        <td data-th="Heading 2">Row 4, Col 2</td>
        <td data-th="Heading 3">Row 4, Col 3</td>
        <td data-th="Heading 4">Row 4, Col 4</td>
        <td data-th="Heading 5">Row 4, Col 5</td>
    </tr>
    <tr>
        <td data-th="Heading 1">Row 5, Col 1</td>
        <td data-th="Heading 2">Row 5, Col 2</td>
        <td data-th="Heading 3">Row 5, Col 3</td>
        <td data-th="Heading 4">Row 5, Col 4</td>
        <td data-th="Heading 5">Row 5, Col 5</td>
    </tr>
</table>
        `;

var rowCollapseJS = ` `;




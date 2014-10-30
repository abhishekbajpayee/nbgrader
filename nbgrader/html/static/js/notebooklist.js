/*global $*/

var notebooks;

$(document).ready(function () {
    $.get("/api/notebooks", function (data) {
        notebooks = JSON.parse(data);
        var elem = $("#notebook-list");
        var nb, row, link;
        for (var i=0; i < notebooks.length; i++) {
            nb = notebooks[i];

            link = $("<a />");
            link.attr("href", "/" + nb.notebook_id + ".autograded.html");
            link.text(nb.notebook_id);

            row = $("<tr />");
            row.append($("<td />").append(link));
            row.append($("<td />").text(nb.student_name));
            row.append($("<td />").text(nb.student_id));
            row.append($("<td />").text(nb.score + " / " + nb.max_score));

            if (nb.needs_manual_grade) {
                row.append($("<td />").append($("<span />").addClass("glyphicon glyphicon-remove")));
            } else {
                row.append($("<td />"));
            }

            elem.append(row);
        }
    });
});

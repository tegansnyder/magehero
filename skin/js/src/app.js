$(document).ready(function() {
    MageHero_App.bindUpvote();
    MageHero_App.bindPostUpvote();
    MageHero_App.bindChosen();
    $('table.listing').tablesorter({
        headers: {
            0: { sorter: false },
            2: { sorter: false },
            4: { sorter: false },
            8: { sorter: false }
        },
        textExtraction: function(cell) {
            var votes = $(cell).find('.vote-count');
            if (votes.length) {
                return votes.text();
            }
            return $(cell).text();
        }
    });

    if ($('textarea.body').size()) {
        var opts = {
            textarea: 'body',
            theme: {
                base:       '../../../../epiceditor/themes/base/epiceditor.css',
                preview:    '../../../../epiceditor/themes/preview/preview-dark.css',
                editor:     '../../../../epiceditor/themes/editor/epic-dark.css'
            }
        };
        var editor = new EpicEditor(opts).load();
    }

    new LazyLoader('.lazyload', 'data-src');
});

document.addEventListener('DOMContentLoaded', function() {
    // Nothing yet
});

MageHero_App = {
    bindUpvote: function() {
        var self = this;

        $('.upvote a').click(function() {
            var userId = $(this).closest('tr').attr('data-user-id');
            var upvoteCount = $(this).closest('.upvote').find('.vote-count')

            $.ajax({
                url: '/user/' + userId + '/upvote',
                method: 'GET',
                success: function(data) {
                    console.log(data);
                    if (! data.success) {
                        alert(data.message);
                        return;
                    }

                    upvoteCount.text(data.vote_count).show();
                }
            });
        });

        return this;
    },

    bindPostUpvote: function() {
        var self = this;

        $('.post-upvote-link').click(function() {
            var postId = $(this).closest('.post-upvote').attr('data-post-id');
            var upvoteCount = $(this).closest('.post-upvote').find('.post-vote-count');

            $.ajax({
                url: '/posts/' + postId + '/upvote',
                method: 'GET',
                success: function(data) {
                    console.log(data);
                    if (! data.success) {
                        alert(data.message);
                        return;
                    }

                    upvoteCount.text(data.vote_count);
                }
            });
        });

        return this;
    },

    bindChosen: function() {
        $('.fancy-select').chosen();
    }
};

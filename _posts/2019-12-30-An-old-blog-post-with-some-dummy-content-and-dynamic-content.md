---
layout: post
title: 'Blog Post with Some Dynamic Content'
categories: misc
---

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

## Latest Changelogs - Imported Dynamically

 <div class="latest__changelogs">
        {% for item in site.data.changelogs limit:1 %}
        <h3>Latest Update - {{item.date}}</h3>
        <ul>
            {% for entry in item.changes %}
            <li>{{entry.item}}</li>
            {% endfor %}
        </ul>
        {% endfor %}
    </div>

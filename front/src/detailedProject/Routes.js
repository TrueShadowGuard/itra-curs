import React from 'react';
import Description from "./Description";
import News from "./News";
import Comments from "./Comments";
import {Route, Switch} from "react-router-dom";
import Gallery from "./Gallery";

export default function Routes ({description, imgs, comments, news, id}) {
    return (
        <Switch>
            <Route exact path={"/projects/:id/"} component={Description.bind(null, description)}/>
            <Route exact path={"/projects/:id/news"} component={News.bind(null, {})}/>
            <Route exact path={"/projects/:id/comments"} component={Comments.bind(null, id, comments)}/>
            <Route exact path={"/projects/:id/gallery"} component={Gallery.bind(null, {})}/>
        </Switch>
    );
};

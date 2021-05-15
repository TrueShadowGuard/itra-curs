import React from 'react';
import Description from "./Description";
import News from "./News";
import Comments from "./Comments";
import {Route, Switch} from "react-router-dom";
import Gallery from "./Gallery";

export default function Routes ({description, imgs, initialComments, news, id}) {
    return (
        <Switch>
            <Route exact path={"/projects/:id/"} component={() => <Description description={description}/>}/>
            <Route exact path={"/projects/:id/news"} component={() => <News />}/>
            <Route exact path={"/projects/:id/comments"} component={() => <Comments id={id} initialComments={initialComments}/>}/>
            <Route exact path={"/projects/:id/gallery"} component={() => <Gallery />}/>
        </Switch>
    );
};

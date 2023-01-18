import React, { ReactElement } from 'react'

import ModalDemo from './ModalDemo'
import BezierCurves from './BezierCurves'

const Challenge = (): ReactElement => {
    return (
        <div>
            {/* React Modals Demo */}
            <ModalDemo />

            {/* Bezier Curves Demo */}
            <BezierCurves />

            {/* Questions */}
            <strong>Questions:</strong>
            <section style={{ textAlign: 'justify' }}>
                <p>
                    <strong>
                        1. How would your representation handle the support of editing path control points in our application?
                        Which members would you expose to do that?
                    </strong>
                </p>
                <p>
                    Answer: In the demo I implemented, I added rudimentary controls to select and move the control points of the
                    path. From the BezierPath2 class, I expose a function that finds the closest point to the location of the
                    mouse event within the contained segments. <br/>
                    I also implemented a basic function to add an additional segment to the path. But the logic to grab together
                    the last points between segments, to move them together is not completely implemented.
                </p>

                <p>
                    <strong>
                        2. How would your representation handle converting one of the path curved segments to a straight line?
                        Which members would you expose to do that?
                    </strong>
                </p>

                <p>
                    Answer: I would implement, selecting mutliple points from the path, and from there, I could use a naive approach
                    to take the first and last points, and simplify it by calculating magnitude between the vectors.<br/>
                    A more sophisticated approach, could be by subdividing the curves and projecting the distance creating a fixed
                    line of points, that can be then simplified into a 2 point path.
                </p>

                <p>
                    <strong>
                        3. (Reactive Components) How would you structure the web application code to keep all the web components
                        reactive to the user input?
                    </strong>
                </p>
                <p>
                    Answer: I would use Redux to handle all the app state and all the information about the models and the textures,
                    etc. One approach could be to have the assets own / fire the events, and have the viewports respond to those events
                    to update / render. Another approach could be to have events on a viewport, go to a dispatcher, that notifies the
                    other viewports, of changes, to then have them update.
                </p>

                <p>
                    <strong>
                        4. (UI Reusability) How much code from the previous answer would you be able to reuse when implementing
                        the new requirements?<br />
                        Describe the hierarchy of components in this new dialog and identify what components are new and what
                        components will require to be implemented.
                    </strong>
                </p>
                <p>
                    Answer: I would be able to reuse all the common controls, list view, modal, layout and get collection name from
                    both those modals. I&apos;ve implemented them both, and left out the part of no coding from this point, which would
                    just be adding the &quot;add image&quot;, &quot;description&quot;, and &quot;members&quot; components.<br/>
                    Those could be easily added with minor modification to the current logic.<br/>
                    <br/>
                    The hierarchy of components would be:<br/>
                    Modal {'->'} Optional Add Image view {'->'} New Collection Name {'->'} ListView {'->'} Description Field {'->'} Add Members {'->'} Actions
                </p>

                <p>
                    <strong>
                        5. (Listings and Pagination) Explain your solution to implement an infinite scrolling component. Explain
                        some details about the interface of the API endpoints.<br />
                        Do you foresee any problems with your solution when dealing with different screen sizes or screen aspect ratios?
                    </strong>
                </p>
                <p>
                    Answer: We could fetch rather quickly a list of say 50 items without images, and lazy load them into placeholders as needed.
                    While the user is idling, we could pre-fetch the next page of results the user has queried.
                    The images loaded into this list view should be thumbnails pre-processed on the server always to ensure quick load times, and
                    we could probably have a optimizing memory cache for the most often hit pages / users, so those results load even faster.
                    This would depend a lot on, the current performance of the system.<br/>
                    If storage is not a problem, we could even generate several sizes of the thumbnails specific to the target devices, and pass
                    the desired resolution on the query parameters to the end points.<br/>
                    Also the list could be forced to a strict grid, cropping extra sizes, or allow for a masonry type of layout, like on a magazine.
                </p>

                <p>
                    <strong>
                        6. (Seam Allowance) Could you think of an algorithm to generate the complete cutting lines automatically
                        from the stitching lines?<br />
                        Look at the following picture, is your algorithm able to handle all corners correctly?
                    </strong>
                </p>
                <p>
                    Answer: Possibly, but you&quot;d need to hire me first :)<br/>
                    But if I understand it correctly, from the lines that trace the seam allowance an algorithm could expand those lines, any
                    given distance outside of the specified line, given the direction of the line, you&quot;d have to translate each vector of the
                    control points of the curves to a magnitude proportional to the distance in the seam allowance.
                </p>

            </section>
        </div>
    )
}

export default Challenge

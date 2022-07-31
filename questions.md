1. What is the difference between Component and PureComponent? give an
   example where it might break my app.

   Pure component re-renders only on prop changed.
   React.PureComponent performs a shallow check in shouldComponentUpdate if the data has changed, then only the update fires.
   There are known issues with the pure component:
   The problem with Pure component is that it can block updates to all children if shouldComponentUpdate returns false.
   Due to the surface check, there is no full comparison, only references to values are compared. This means that if you, for example, do not pass new props, but simply change the old ones directly, then PureComponent will return false in shouldComponentUpdate, and no update will occur.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
   that?

   ShouldComponentUpdate blocks part of the component tree (including children) from being re-rendered, for example, if props or the state of the component are not changed as desired. In this way, context propagation to child elements can be broken.

3. Describe 3 ways to pass information from a component to its PARENT.

   Pass the callback function to the child as a props from the parent component.
   The child component calls the parent callback function using props and passes the data to the parent component.
   In the parent component, create a callback function. This callback function will retrieve the data from the child component.

4. Give 2 ways to prevent components from re-rendering.
   Use useMemo|ShouldComponentUpdate
   PureComponent
   If this is component in list, use key to prevent re-rendering.

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

   It allows us to add multiple elements to React component without wrapping into additional dom element.
   There may be problems with component styling and classes, classes can be assigned to a fragment, and after the component is rendered, the fragment disappears and classes can also disappear

6. Give 3 examples of the HOC pattern.
   1)WithLoader-hoc which manage loader
   2)Logging-hoc which manage logger to console for example
   3)HOC for styling component
   const higherOrderComponent = (WrappedComponent) => {
   class HOC extends React.Component {
   render() {
   return <WrappedComponent />;
   }
   }
   return HOC;
   };

7. what's the difference in handling exceptions in promises, callbacks and
   async...await.

   CallBacks:
   callback(new Error("Here is the error message"));

   async await:
   try {
   doDomething();
   } catch (e) {
   console.error(e);
   }

   promises:
   it is handled by reject:
   const MyPromise = new Promise((resolve, reject) => {
   reject('error message')
   })
   MyPromise
   .catch(error => {
   console.error(error)
   })

});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
function(value) { /_ code if successful _/ },
function(error) { /_ code if some error _/ }
);

8. How many arguments does setState take and why is it async.
   2 arguments:
   1)value to update the state
   2)function that always run after setState is run

9. List the steps needed to migrate a Class to Function Component.

   1. Change the class to a function
   2. delete render method
   3. rewrite all metthods to functions
   4. remove constructor
   5. remove this
   6. rewrite lifecycle methods with hooks

10. List a few ways styles can be used with components.
    Styled-components
    CSS Modules
    CSS Stylesheet

11. How to render an HTML string coming from the server.
    We should set dangerouslySetInnerHTML={{ __html: valueFromServer }} prop to html tag

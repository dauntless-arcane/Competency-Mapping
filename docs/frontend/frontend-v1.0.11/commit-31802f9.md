### High-level summary

The commit refactors the `ChartTooltip` component with improved type definitions, enhancing its functionality and maintainability.

### What changed

*   Renamed `FixedTooltipProps` to `ChartTooltipProps`
*   Updated `ChartTooltipProps` type to include additional properties:
    *   `hideLabel`
    *   `hideIndicator`
    *   `indicator`
    *   `nameKey`
    *   `labelKey`
*   Changed the type of `indicator` to a string literal type (`"line" | "dot" | "dashed"`)
*   Added `React.ComponentProps<"div">` to `ChartTooltipProps` to include HTML div props
*   Updated the `ChartTooltipContent` component to use the new `ChartTooltipProps` type
*   Removed unnecessary type annotations

### Why it likely changed

The change likely occurred to improve the maintainability and extensibility of the `ChartTooltip` component. By introducing additional type definitions, the code becomes more self-documenting and easier to understand. This refactoring also prepares the component for potential future features or customizations.

### Impact on system

The changes should have a positive impact on the system, as they:

*   Enhance code readability and maintainability
*   Improve the component's flexibility and customizability
*   Reduce the likelihood of type-related errors

### Possible risks

There are no apparent risks associated with this change. However, it's essential to ensure that the updated type definitions do not break any existing functionality or dependencies.

### Migration notes (if needed)

To migrate to the new `ChartTooltipProps` type, update the `ChartTooltip` component to use the new type definition. This may involve updating the component's props and types in other parts of the codebase.

### Test recommendations

*   Update existing unit tests to cover the new `ChartTooltipProps` type and its additional properties.
*   Write new integration tests to verify the component's behavior with the updated type definitions.
*   Run a thorough test suite to ensure that the changes do not introduce any regressions.

### Final release note

"Improved ChartTooltip component with enhanced type definitions for better maintainability and customizability."

### Full markdown explanation

#### Deep Commit Analysis: Refactor ChartTooltip with Improved Type Definitions

### Commit Summary

The commit refactors the `ChartTooltip` component with improved type definitions, enhancing its functionality and maintainability.

### Changes

*   Renamed `FixedTooltipProps` to `ChartTooltipProps`
*   Updated `ChartTooltipProps` type to include additional properties:
    *   `hideLabel`
    *   `hideIndicator`
    *   `indicator`
    *   `nameKey`
    *   `labelKey`
*   Changed the type of `indicator` to a string literal type (`"line" | "dot" | "dashed"`)
*   Added `React.ComponentProps<"div">` to `ChartTooltipProps` to include HTML div props
*   Updated the `ChartTooltipContent` component to use the new `ChartTooltipProps` type
*   Removed unnecessary type annotations

### Why it Likely Changed

The change likely occurred to improve the maintainability and extensibility of the `ChartTooltip` component. By introducing additional type definitions, the code becomes more self-documenting and easier to understand. This refactoring also prepares the component for potential future features or customizations.

### Impact on System

The changes should have a positive impact on the system, as they:

*   Enhance code readability and maintainability
*   Improve the component's flexibility and customizability
*   Reduce the likelihood of type-related errors

### Possible Risks

There are no apparent risks associated with this change. However, it's essential to ensure that the updated type definitions do not break any existing functionality or dependencies.

### Migration Notes (if Needed)

To migrate to the new `ChartTooltipProps` type, update the `ChartTooltip` component to use the new type definition. This may involve updating the component's props and types in other parts of the codebase.

### Test Recommendations

*   Update existing unit tests to cover the new `ChartTooltipProps` type and its additional properties.
*   Write new integration tests to verify the component's behavior with the updated type definitions.
*   Run a thorough test suite to ensure that the changes do not introduce any regressions.

### Final Release Note

"Improved ChartTooltip component with enhanced type definitions for better maintainability and customizability."
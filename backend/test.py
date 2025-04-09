import numpy_financial as npf
# Example cash flows: initial investment of -1000 followed by returns of 200, 300, 400, and 500
cash_flows = [-1000, 200, 300, 400, 500]

# Calculate the internal rate of return (IRR)


irr = npf.irr(cash_flows)

# Print the IRR
print(f"The internal rate of return (IRR) is: {irr:.2%}")
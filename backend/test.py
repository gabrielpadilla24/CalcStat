import numpy as np

def print_matrix(M, step_name):
    """
    Prints the matrix with a descriptive header for each step.
    """
    print(f"\n--- {step_name} ---")
    print(M)

def gaussian_elimination(A, b):
    """
    Solves a system of linear equations Ax = b using Gaussian elimination.

    Args:
        A (np.ndarray): The coefficient matrix.
        b (np.ndarray): The constant vector.

    Returns:
        np.ndarray: The solution vector x, or None if no unique solution exists.
    """
    # Combine A and b into an augmented matrix
    M = np.concatenate((A, b.reshape(-1, 1)), axis=1).astype(float)
    n = len(M)
    
    print("Initial Augmented Matrix:")
    print_matrix(M, "Step 0: Initial Setup")

    # --- Phase 1: Forward Elimination ---
    for i in range(n):
        # Find the pivot for column i
        max_row = i
        for k in range(i + 1, n):
            if abs(M[k, i]) > abs(M[max_row, i]):
                max_row = k
        
        # Swap the current row with the row containing the maximum pivot
        M[[i, max_row]] = M[[max_row, i]]
        print_matrix(M, f"Step {i+1}.1: Pivot Row Swap (Row {i} and {max_row})")

        # Check for a zero pivot, which may indicate no unique solution
        pivot = M[i, i]
        if pivot == 0:
            print(f"\nNo unique solution exists for this system. The pivot in column {i} is zero.")
            return None
        
        # Normalize the pivot row
        M[i] = M[i] / pivot
        print_matrix(M, f"Step {i+1}.2: Normalize Pivot Row {i}")

        # Eliminate other entries in the current column
        for j in range(n):
            if i != j:
                factor = M[j, i]
                M[j] = M[j] - factor * M[i]
                print_matrix(M, f"Step {i+1}.3: Eliminate Row {j} using Pivot Row {i}")

    # --- Phase 2: Backward Substitution (Solution) ---
    x = M[:, -1]
    
    print("\n--- Final Result ---")
    print("The solved system is:")
    for i in range(n):
        variable = f"x{i+1}"
        value = x[i]
        print(f"  {variable} = {value:.4f}")

    return x

# --- Example Usage ---
# Example 1: A solvable system
A1 = np.array([[2, 1, -1],
               [-3, -1, 2],
               [-2, 1, 2]])
b1 = np.array([8, -11, -3])

print("\n--- Solving Example 1 ---")
x1 = gaussian_elimination(A1, b1)

# Example 2: A system with no unique solution
print("\n" + "="*50)
print("--- Solving Example 2 (No Unique Solution) ---")
A2 = np.array([[1, 2],
               [2, 4]])
b2 = np.array([5, 10])

x2 = gaussian_elimination(A2, b2)
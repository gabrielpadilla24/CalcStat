import numpy as np

def calcular_eigen(matriz):
    """
    Calcula y muestra paso a paso los eigenvalores y eigenvectores de una matriz.

    Argumentos:
    matriz (np.array): La matriz cuadrada de entrada.

    Retorna:
    tuple: Una tupla que contiene los eigenvalores y los eigenvectores.
    """
    # 1. Verificar si la matriz es cuadrada
    print("Paso 1: Verificando si la matriz es cuadrada...")
    if matriz.shape[0] != matriz.shape[1]:
        print("Error: La matriz no es cuadrada. No se pueden calcular los eigenvalores y eigenvectores.")
        return None, None
    print("La matriz es cuadrada. Continuamos.")

    # 2. Mostrar la matriz de entrada
    print("\nPaso 2: La matriz de entrada es:")
    print(matriz)
    
    # 3. Calcular los eigenvalores y eigenvectores
    print("\nPaso 3: Calculando eigenvalores y eigenvectores usando numpy.linalg.eig()...")
    eigenvalores, eigenvectores = np.linalg.eig(matriz)

    # 4. Mostrar los eigenvalores
    print("\nPaso 4: Los eigenvalores son:")
    for i, valor in enumerate(eigenvalores):
        print(f"  λ{i+1} = {valor:.4f}")

    # 5. Mostrar los eigenvectores
    print("\nPaso 5: Los eigenvectores correspondientes son (cada columna es un eigenvector):")
    print(eigenvectores)
    
    # 6. Verificación (opcional)
    print("\nPaso 6: Verificación (A*v = λ*v)")
    for i in range(len(eigenvalores)):
        eigenvalor_i = eigenvalores[i]
        eigenvector_i = eigenvectores[:, i]
        
        # A*v
        Av = matriz @ eigenvector_i
        # λ*v
        lambdav = eigenvalor_i * eigenvector_i
        
        print(f"\nVerificando para λ{i+1}:")
        print(f"  A * v{i+1} = {Av}")
        print(f"  λ{i+1} * v{i+1} = {lambdav}")

    return eigenvalores, eigenvectores

# Ejemplo de uso:
matriz_ejemplo = np.array([[4, 1],
                           [2, 3]])

eigenvalores, eigenvectores = calcular_eigen(matriz_ejemplo)
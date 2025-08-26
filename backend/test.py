import numpy as np

def gram_schmidt(vectors):
    """
    Aplica el proceso de ortonormalización de Gram-Schmidt a un conjunto de vectores.

    Args:
        vectors (list of np.array): Una lista de vectores linealmente independientes.

    Returns:
        list of np.array: Una lista de vectores ortonormales.
    """
    # Convierte la lista de vectores a un array de numpy para facilitar las operaciones.
    vectors = [np.array(v, dtype=float) for v in vectors]
    
    # Crea una lista para almacenar los vectores ortonormales.
    orthonormal_vectors = []
    
    # Itera sobre cada vector del conjunto original.
    for v in vectors:
        # Inicializa el nuevo vector ortogonal como el vector actual.
        u = v.copy()
        
        # Proyecta el vector actual sobre cada uno de los vectores ya ortonormalizados.
        for q in orthonormal_vectors:
            # Producto punto entre el vector actual y el vector ortonormal.
            proj_scalar = np.dot(v, q)
            # Resta la proyección del vector actual.
            u -= proj_scalar * q
        
        # Calcula la norma del nuevo vector ortogonal.
        norm_u = np.linalg.norm(u)
        
        # Si la norma es casi cero, los vectores no son linealmente independientes.
        if norm_u < 1e-10:
            raise ValueError("El conjunto de vectores no es linealmente independiente.")
        
        # Normaliza el vector ortogonal.
        q_new = u / norm_u
        
        # Añade el vector ortonormal a la lista.
        orthonormal_vectors.append(q_new)
        
    return orthonormal_vectors

# --- Ejemplo de uso ---
if __name__ == "__main__":
    # Define un conjunto de vectores.
    v1 = [1, 1, 0]
    v2 = [1, 0, 1]
    v3 = [0, 1, 1]
    
    # Aplica Gram-Schmidt.
    try:
        orthonormal_vectors = gram_schmidt([v1, v2, v3])
        
        # Imprime los vectores ortonormales resultantes.
        print("Vectores originales:")
        print(f"v1 = {v1}")
        print(f"v2 = {v2}")
        print(f"v3 = {v3}")
        print("\nVectores ortonormales:")
        for i, q in enumerate(orthonormal_vectors):
            print(f"q{i+1} = {np.round(q, 4)}")
            
        # Opcional: Verifica la ortonormalidad (producto punto = 0, norma = 1)
        print("\nVerificación:")
        print(f"Producto punto q1 · q2: {np.round(np.dot(orthonormal_vectors[0], orthonormal_vectors[1]), 4)}")
        print(f"Norma de q1: {np.round(np.linalg.norm(orthonormal_vectors[0]), 4)}")
        
    except ValueError as e:
        print(e)
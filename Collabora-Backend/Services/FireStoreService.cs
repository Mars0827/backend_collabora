namespace Collabora_Backend.Services
{
    using Google.Cloud.Firestore;
    public class FirestoreService

    {
        private readonly FirestoreDb _firestoreDb;

        public FirestoreService(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        public async Task AddDocumentAsync<T>(string collectionName, T document)
        {
            CollectionReference collection = _firestoreDb.Collection(collectionName);
            await collection.AddAsync(document);
        }

        public async Task<T?> GetDocumentAsync<T>(string collectionName, string documentId) where T : class
        {
            DocumentReference document = _firestoreDb.Collection(collectionName).Document(documentId);
            DocumentSnapshot snapshot = await document.GetSnapshotAsync();
            return snapshot.Exists ? snapshot.ConvertTo<T>() : null;
        }

        public async Task<List<T>> GetAllDocumentsAsync<T>(string collectionName) where T : class
        {
            Query query = _firestoreDb.Collection(collectionName);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();
            return snapshot.Documents.Select(doc => doc.ConvertTo<T>()).ToList();
        }
    }
}

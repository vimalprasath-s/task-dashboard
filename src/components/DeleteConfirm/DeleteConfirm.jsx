import './DeleteConfirm.css'

export default function DeleteConfirm({ taskTitle, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete Task</h3>
        <p>
          Are you sure you want to delete
          <strong> “{taskTitle}”</strong>?
        </p>

        <div className="actions">
          <button onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
